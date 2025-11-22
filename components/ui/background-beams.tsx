"use client"
import React, { useMemo, useState, useEffect, useRef, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface BackgroundBeamsProps {
  className?: string
  intensity?: "low" | "medium" | "high" | "extreme"
  colorScheme?: "default" | "warm" | "cool" | "monochrome" | "rainbow" | "neon" | "sunset" | "ocean"
  speed?: "slow" | "normal" | "fast" | "hyperspeed"
  density?: "sparse" | "normal" | "dense" | "ultra"
  interactive?: boolean
  pulseOnHover?: boolean
  particles?: boolean
  glowEffect?: boolean
  morphing?: boolean
  layers?: number
  audioReactive?: boolean
  customPaths?: string[]
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  pathIndex: number
  progress: number
}

export const BackgroundBeams = React.memo(
  ({
    className,
    intensity = "medium",
    colorScheme = "default",
    speed = "normal",
    density = "normal",
    interactive = false,
    pulseOnHover = false,
    particles = false,
    glowEffect = false,
    morphing = false,
    layers = 1,
    audioReactive = false,
    customPaths = [],
  }: BackgroundBeamsProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [particleSystem, setParticleSystem] = useState<Particle[]>([])
    const [audioData, setAudioData] = useState<number[]>([])
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number>(null)
    const audioContextRef = useRef<AudioContext>(null)
    const analyserRef = useRef<AnalyserNode>(null)
    const controls = useAnimation()

    const basePaths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
      "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
      "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
      // Additional curved paths for more variety
      "M-400 -100C-200 100 200 -100 400 100C600 300 800 100 1000 300",
      "M-450 -150C-250 50 150 -150 350 50C550 250 750 50 950 250",
      "M-500 -200C-300 0 100 -200 300 0C500 200 700 0 900 200",
      // Spiral-like paths
      "M0 0C100 100 200 0 300 100C400 200 500 100 600 200",
      "M50 50C150 -50 250 50 350 -50C450 50 550 -50 650 50",
      // Wave patterns
      "M-600 300C-400 100 -200 500 0 300C200 100 400 500 600 300C800 100 1000 500 1200 300",
      "M-650 350C-450 150 -250 550 -50 350C150 150 350 550 550 350C750 150 950 550 1150 350",
    ]

    const colorSchemes = {
      default: {
        start: "#18CCFC",
        middle: "#6344F5",
        end: "#AE48FF",
      },
      warm: {
        start: "#FF6B6B",
        middle: "#FF8E53",
        end: "#FF6B9D",
      },
      cool: {
        start: "#4ECDC4",
        middle: "#44A08D",
        end: "#096DD9",
      },
      monochrome: {
        start: "#FFFFFF",
        middle: "#888888",
        end: "#333333",
      },
      rainbow: {
        start: "#FF0080",
        middle: "#7928CA",
        end: "#FF0080",
      },
      neon: {
        start: "#00FF41",
        middle: "#00D4FF",
        end: "#FF0080",
      },
      sunset: {
        start: "#FF512F",
        middle: "#F09819",
        end: "#FF512F",
      },
      ocean: {
        start: "#667eea",
        middle: "#764ba2",
        end: "#667eea",
      },
    }

    const generateMorphingPath = useCallback(
      (baseIndex: number, time: number) => {
        if (!morphing) return basePaths[baseIndex] || basePaths[0]

        const amplitude = 50 + Math.sin(time * 0.001 + baseIndex) * 30
        const frequency = 0.01 + baseIndex * 0.002
        const offset = Math.sin(time * 0.002 + baseIndex) * 100

        return `M${-400 + offset} ${-200 + amplitude * Math.sin(time * frequency)}C${-200 + offset} ${100 + amplitude * Math.sin(time * frequency + 1)} ${200 + offset} ${-100 + amplitude * Math.sin(time * frequency + 2)} ${400 + offset} ${100 + amplitude * Math.sin(time * frequency + 3)}C${600 + offset} ${300 + amplitude * Math.sin(time * frequency + 4)} ${800 + offset} ${100 + amplitude * Math.sin(time * frequency + 5)} ${1000 + offset} ${300 + amplitude * Math.sin(time * frequency + 6)}`
      },
      [morphing],
    )

    const paths = useMemo(() => {
      const allPaths = customPaths.length > 0 ? [...customPaths, ...basePaths] : basePaths
      const densityMultiplier = density === "sparse" ? 0.3 : density === "dense" ? 1.5 : density === "ultra" ? 2.5 : 1
      const pathCount = Math.floor(allPaths.length * densityMultiplier)
      return allPaths.slice(0, pathCount)
    }, [density, customPaths])

    const colors = colorSchemes[colorScheme]

    const speedConfig = {
      slow: { duration: 15, delay: 4 },
      normal: { duration: 8, delay: 2 },
      fast: { duration: 4, delay: 1 },
      hyperspeed: { duration: 1, delay: 0.2 },
    }

    const intensityConfig = {
      low: { opacity: 0.15, strokeWidth: "0.2", blur: 0 },
      medium: { opacity: 0.4, strokeWidth: "0.5", blur: 0 },
      high: { opacity: 0.6, strokeWidth: "0.7", blur: 1 },
      extreme: { opacity: 0.8, strokeWidth: "1.2", blur: 2 },
    }

    const config = intensityConfig[intensity]
    const speedSettings = speedConfig[speed]

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting)
        },
        { threshold: 0.1 },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => observer.disconnect()
    }, [])

    useEffect(() => {
      if (!audioReactive || !isVisible) return

      const initAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          audioContextRef.current = new AudioContext()
          analyserRef.current = audioContextRef.current.createAnalyser()
          const source = audioContextRef.current.createMediaStreamSource(stream)
          source.connect(analyserRef.current)
          analyserRef.current.fftSize = 256
        } catch (error) {
          console.warn(error,"Audio access denied or not available")
        }
      }

      initAudio()

      return () => {
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
      }
    }, [audioReactive, isVisible])

    useEffect(() => {
      if (!particles || !isVisible) return

      const updateParticles = () => {
        setParticleSystem((prev) => {
          const newParticles = prev
            .map((particle) => ({
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              life: particle.life - 1,
              progress: (particle.progress + 0.01) % 1,
            }))
            .filter((particle) => particle.life > 0)

            //add new particles to tis block below to satisfy necessary needs 
          if (newParticles.length < 50 && Math.random() < 0.3) {
            const pathIndex = Math.floor(Math.random() * paths.length)
            newParticles.push({
              id: Date.now() + Math.random(),
              x: Math.random() * 1000 - 500,
              y: Math.random() * 600 - 300,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 60 + Math.random() * 120,
              maxLife: 180,
              pathIndex,
              progress: 0,
            })
          }

          return newParticles
        })

        animationRef.current = requestAnimationFrame(updateParticles)
      }

      updateParticles()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [particles, paths.length, isVisible])

    useEffect(() => {
      if (!audioReactive || !analyserRef.current || !isVisible) return

      const updateAudioData = () => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount)
        analyserRef.current!.getByteFrequencyData(dataArray)
        setAudioData(Array.from(dataArray))
        requestAnimationFrame(updateAudioData)
      }

      updateAudioData()
    }, [audioReactive, isVisible])

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!interactive) return
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }

    useEffect(() => {
      if (pulseOnHover && isHovered) {
        const audioMultiplier =
          audioReactive && audioData.length > 0
            ? 1 + (audioData.reduce((a, b) => a + b, 0) / audioData.length / 255) * 0.5
            : 1

        controls.start({
          scale: [1, 1.05 * audioMultiplier, 1],
          transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        })
      } else {
        controls.start({ scale: 1 })
      }
    }, [isHovered, pulseOnHover, controls, audioReactive, audioData])

    const renderLayer = (layerIndex: number) => {
      const layerOpacity = config.opacity * (1 - layerIndex * 0.2)
      const layerBlur = config.blur + layerIndex * 0.5
      const layerOffset = layerIndex * 20

      return (
        <g
          key={`layer-${layerIndex}`}
          style={{ filter: glowEffect ? `blur(${layerBlur}px) brightness(1.2)` : undefined }}
        >
          {paths.map((path, index) => {
            const audioMultiplier =
              audioReactive && audioData[index % audioData.length]
                ? 1 + (audioData[index % audioData.length] / 255) * 0.5
                : 1

            const currentPath = morphing ? generateMorphingPath(index, Date.now()) : path

            return (
              <motion.path
                key={`path-${layerIndex}-${index}`}
                d={currentPath}
                stroke={`url(#linearGradient-${layerIndex}-${index})`}
                strokeOpacity={layerOpacity * audioMultiplier}
                strokeWidth={Number.parseFloat(config.strokeWidth) * audioMultiplier}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: isVisible ? 1 : 0,
                  opacity: isVisible ? 1 : 0,
                }}
                transition={{
                  duration: speedSettings.duration + Math.random() * 2,
                  ease: "easeInOut",
                  repeat: isVisible ? Number.POSITIVE_INFINITY : 0,
                  delay: Math.random() * speedSettings.delay,
                }}
                transform={`translate(${layerOffset}, ${layerOffset})`}
              />
            )
          })}
        </g>
      )
    }

    return (
      <motion.div
        ref={containerRef}
        className={cn("absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden", className)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={controls}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: layers }, (_, i) => renderLayer(i))}

          {particles &&
            particleSystem.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={particle.x}
                cy={particle.y}
                r={2}
                fill={colors.start}
                opacity={particle.life / particle.maxLife}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.8, 1, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

          <defs>
            {Array.from({ length: layers }, (_, layerIndex) =>
              paths.map((path, index) => {
                const audioInfluence =
                  audioReactive && audioData[index % audioData.length] ? audioData[index % audioData.length] / 255 : 0

                return (
                  <motion.linearGradient
                    id={`linearGradient-${layerIndex}-${index}`}
                    key={`gradient-${layerIndex}-${index}`}
                    initial={{
                      x1: "0%",
                      x2: "0%",
                      y1: "0%",
                      y2: "0%",
                    }}
                    animate={{
                      x1: interactive
                        ? ["0%", `${mousePosition.x * 100}%`, "100%"]
                        : audioReactive
                          ? ["0%", `${audioInfluence * 100}%`, "100%"]
                          : ["0%", "100%"],
                      x2: interactive ? ["0%", `${mousePosition.x * 95}%`, "95%"] : ["0%", "95%"],
                      y1: interactive
                        ? ["0%", `${mousePosition.y * 100}%`, "100%"]
                        : audioReactive
                          ? ["0%", `${audioInfluence * 100}%`, "100%"]
                          : ["0%", "100%"],
                      y2: ["0%", `${93 + Math.random() * 8 + audioInfluence * 10}%`],
                    }}
                    transition={{
                      duration: speedSettings.duration + Math.random() * 3,
                      ease: "easeInOut",
                      repeat: isVisible ? Number.POSITIVE_INFINITY : 0,
                      delay: Math.random() * speedSettings.delay,
                    }}
                  >
                    <stop stopColor={colors.start} stopOpacity="0" />
                    <stop stopColor={colors.start} stopOpacity={0.8 + audioInfluence * 0.2} />
                    <stop offset="32.5%" stopColor={colors.middle} stopOpacity={1} />
                    <stop offset="100%" stopColor={colors.end} stopOpacity="0" />
                  </motion.linearGradient>
                )
              }),
            )}

            <radialGradient
              id="paint0_radial_ultra"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(600 400) rotate(90) scale(800 2000)"
            >
              <stop offset="0.0666667" stopColor={colors.middle} stopOpacity="0.1" />
              <stop offset="0.243243" stopColor={colors.start} stopOpacity="0.05" />
              <stop offset="0.43594" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>

        {glowEffect && (
          <div
            className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-transparent"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${colors.start}20 0%, transparent 50%)`,
              mixBlendMode: "screen",
            }}
          />
        )}
      </motion.div>
    )
  },
)

BackgroundBeams.displayName = "BackgroundBeams"

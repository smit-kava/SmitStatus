import Slider from "@mui/material/Slider"
import { styled } from "@mui/material/styles"

// ─── Styled vertical MUI Slider ────────────────────────────────────────────────
const BannerSlider = styled(Slider)({
  color: "#00a0e9",
  width: 3,
  "& .MuiSlider-track": {
    border: "none",
    width: 3,
    background: "linear-gradient(to top, #fcd400, #00a0e9, #00d4ff)",
  },
  "& .MuiSlider-rail": { width: 3, background: "rgba(255,255,255,0.15)" },
  "& .MuiSlider-thumb": {
    width: 14, height: 14,
    background: "#fff",
    border: "2px solid #00a0e9",
    boxShadow: "0 0 0 3px rgba(0,160,233,0.2)",
    "&:hover, &.Mui-focusVisible": { boxShadow: "0 0 0 7px rgba(0,160,233,0.25)" },
    "&::before": { display: "none" },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 10,
    background: "rgba(0,13,26,0.92)",
    border: "0.5px solid rgba(0,160,233,0.4)",
    borderRadius: 5,
    padding: "2px 6px",
    color: "#00d4ff",
    "&::before": { display: "none" },
  },
})

interface SpeedControllerProps {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  step?: number
}

const speedLabel = (v: number) => `${v.toFixed(1)}×`

export default function SpeedController({
  value,
  onChange,
  min = 0.5,
  max = 6,
  step = 0.1,
}: SpeedControllerProps) {

  const handleIncrement = () => {
    onChange(Math.min(max, Number((value + 0.5).toFixed(1))))
  }

  const handleDecrement = () => {
    onChange(Math.max(min, Number((value - 0.5).toFixed(1))))
  }

  return (
    <div className="bs-slider-overlay">
      {/* Rocket Label */}
      <div className="bs-slider-label" title="Faster">
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2a2.5 2.5 0 0 0-3-3z" />
          <path d="M12 8 6.9 6.6A2 2 0 0 0 4.6 7.9L3 12h3" />
          <path d="m12 8 4 4-1.5 5.4a2 2 0 0 1-1.3 1.3L12 20v-3" />
          <path d="m12 8 1.5-3.5A2 2 0 0 1 15 3h5l-3 3" />
          <circle cx="17" cy="7" r="1" />
        </svg>
      </div>

      {/* Increment button (+) */}
      <button
        onClick={handleIncrement}
        className="bs-speed-btn"
        title="Increase speed by 0.5"
        aria-label="Increase speed"
      >
        +
      </button>

      {/* Slider */}
      <BannerSlider
        orientation="vertical"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_: Event, val: number | number[]) => onChange(val as number)}
        valueLabelDisplay="auto"
        valueLabelFormat={speedLabel}
        aria-label="Scroll speed"
        sx={{ height: 85 }}
      />

      {/* Decrement button (-) */}
      <button
        onClick={handleDecrement}
        className="bs-speed-btn"
        title="Decrease speed by 0.5"
        aria-label="Decrease speed"
      >
        -
      </button>

      {/* Turtle Label */}
      <div className="bs-slider-label" title="Slower">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9a6 6 0 0 0-6 6h12a6 6 0 0 0-6-6z" />
          <path d="M12 9V5" /><circle cx="12" cy="4" r="1" />
          <path d="M5.5 15.5 4 17M18.5 15.5 20 17M9 21h6" />
        </svg>
      </div>

      {/* Readout badge */}
      <div className="bs-speed-badge">{speedLabel(value)}</div>
    </div>
  )
}

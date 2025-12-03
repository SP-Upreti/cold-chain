
export default function Hero() {
  return (
    <div className="min-h-screen relative grid grid-cols-2 ">
      <div className="absolute inset-0 pointer-event-none">
        <div className="h-full w-full relative">
          <video src="/video/video2.mp4" autoPlay loop muted className="h-full w-full brightness-75 object-cover">Your browser does not support the video tag.</video>
        </div>
      </div>
    </div>
  )
}

interface CameraCountdownProps {
  countdown: number | null;
}

const CameraCountdown: React.FC<CameraCountdownProps> = ({ countdown }) => {
  if (countdown === null) return null;

  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-bold text-white animate-pulse mb-4">
          {countdown}
        </div>
        <div className="text-white text-xl">Smile😊</div>
      </div>
    </div>
  );
};

export default CameraCountdown;

import { memo } from 'react';
export const AnimatedBackground = memo(() => {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-background">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.15),rgba(255,255,255,0))]"></div>
      </div>
    </div>
  );
});
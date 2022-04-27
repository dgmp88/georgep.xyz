import React from 'react';

export function Background() {
  return (
    <div>
      <div
        className="fixed w-screen h-screen"
        style={{
          zIndex: '-1',
          backgroundImage: "url('/curves.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
}

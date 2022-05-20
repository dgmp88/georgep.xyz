import React from 'react';

export function Background() {
  return (
    <div>
      <div
        className="fixed w-screen h-screen"
        style={{
          zIndex: '-1',
          backgroundColor: '#555555',
          backgroundImage: "url('/hex.svg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
}

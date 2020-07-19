import React from 'react';

export default function Button({
  title,
  onClick,
  full = false,
  className = '',
  subtitle,
  alt = title,
}) {
  let classNames =
    'bg-secondary hover:bg-green-600 focus:bg-green-700 focus:outline-none hover:shadow text-white font-bold rounded text-center';

  if (full) {
    classNames = `${classNames} w-full`;
  }
  return (
    <button
      title={alt}
      onClick={onClick}
      className={`${classNames} ${className}`}>
      <>
        {title}{' '}
        {subtitle && (
          <span className="text-xs hidden md:inline-block opacity-75">
            ({subtitle})
          </span>
        )}
      </>
    </button>
  );
}

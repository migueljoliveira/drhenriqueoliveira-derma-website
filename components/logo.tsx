export function Logo() {
  return (
    <svg width="48" height="48" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Face profile and hair/leaf shape */}
      <path
        d="M80 30C75 35 65 50 65 70C65 90 75 100 85 105C95 100 105 90 105 70C105 50 95 35 90 30C85 35 80 30 80 30Z"
        stroke="#2E2E2E"
        strokeWidth="2"
        fill="none"
      />
      <path d="M65 70C60 70 55 65 55 60C55 55 57 53 60 50" stroke="#2E2E2E" strokeWidth="2" fill="none" />
      <path d="M55 60L40 60" stroke="#2E2E2E" strokeWidth="2" />
      <path d="M35 60L15 60" stroke="#2E2E2E" strokeWidth="2" />
      <path d="M15 55L15 65" stroke="#2E2E2E" strokeWidth="2" />
      <path d="M35 55L35 65" stroke="#2E2E2E" strokeWidth="2" />

      {/* H.O. text */}
      <path d="M40 100H45V90H55V100H60V80H55V85H45V80H40V100Z" fill="#2E2E2E" />
      <circle cx="65" cy="90" r="1.5" fill="#2E2E2E" />
      <path
        d="M75 90C75 84.5 80 80 85 80C90 80 95 84.5 95 90C95 95.5 90 100 85 100C80 100 75 95.5 75 90Z"
        stroke="#2E2E2E"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="95" cy="90" r="1.5" fill="#2E2E2E" />
    </svg>
  )
}

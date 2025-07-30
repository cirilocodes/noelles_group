export default function HabiGridLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main house structure */}
      <path
        d="M50 10L85 35V85H15V35L50 10Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Inner "G" design */}
      <path
        d="M30 45H45V60H55V50H65V70H55V75H45V60H35V70H30V45Z"
        fill="white"
        strokeWidth="0"
      />
      
      {/* Grid pattern detail */}
      <line x1="15" y1="50" x2="85" y2="50" stroke="white" strokeWidth="1" opacity="0.3"/>
      <line x1="15" y1="60" x2="85" y2="60" stroke="white" strokeWidth="1" opacity="0.3"/>
      <line x1="15" y1="70" x2="85" y2="70" stroke="white" strokeWidth="1" opacity="0.3"/>
    </svg>
  );
}
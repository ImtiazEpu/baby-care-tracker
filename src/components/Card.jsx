const Card = ({ children, className = '', padding = true, hover = false }) => {
  const paddingStyles = padding ? 'p-4 sm:p-6' : '';
  const hoverStyles = hover ? 'hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div className={`glass-card border border-white/10 rounded-2xl transition-all duration-300 overflow-hidden ${paddingStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

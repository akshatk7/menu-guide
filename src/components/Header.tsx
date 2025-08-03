const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-14 w-full bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍴</span>
          <h1 className="font-heading font-semibold text-foreground">
            What Should I Order?
          </h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <a 
            href="#about" 
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            About
          </a>
          <a 
            href="#feedback" 
            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
          >
            Feedback
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
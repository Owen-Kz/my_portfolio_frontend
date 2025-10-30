import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Folder, User, Mail, Globe, Terminal, Grid, Minus } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const WebNavigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('/');
    const [isTaskView, setIsTaskView] = useState(false);
    const [sectionPreviews, setSectionPreviews] = useState({});
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    // Refs to track scroll behavior
    const scrollTimeoutRef = useRef(null);
    const lastScrollDirectionRef = useRef('down');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Update scrolled state for styling
            setIsScrolled(currentScrollY > 50);

            // Handle mobile nav visibility
            if (window.innerWidth < 1024) { // lg breakpoint
                if (scrollDirection === 'down' && currentScrollY > 100) {
                    // Scrolling down - hide nav
                    setIsMobileNavVisible(false);
                } else if (scrollDirection === 'up') {
                    // Scrolling up - show nav
                    setIsMobileNavVisible(true);
                }

                // Always show nav at the top of the page
                if (currentScrollY < 50) {
                    setIsMobileNavVisible(true);
                }
            } else {
                // Always visible on desktop
                setIsMobileNavVisible(true);
            }

            setLastScrollY(currentScrollY);
            lastScrollDirectionRef.current = scrollDirection;

            // Clear any existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Auto-show nav when scrolling stops (optional)
            scrollTimeoutRef.current = setTimeout(() => {
                if (window.innerWidth < 1024 && lastScrollDirectionRef.current === 'down' && currentScrollY > 100) {
                    setIsMobileNavVisible(true);
                }
            }, 1500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [lastScrollY]);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    const navItems = [
        { name: 'Home', href: '/', id: 'home', icon: Home, color: 'from-[#4E9C7E] to-[#1f6feb]' },
        { name: 'Portfolio', href: '/dev-portfolio', id: 'portfolio', icon: Folder, color: 'from-[#1f6feb] to-[#4E9C7E]' },
        { name: 'About', href: '/dev-about', id: 'about', icon: User, color: 'from-[#da3633] to-[#4E9C7E]' },
        { name: 'Contact', href: '/dev-contact', id: 'dev-contact', icon: Mail, color: 'from-[#4E9C7E] to-[#da3633]' },
        { name: 'Web Apps', href: '/webapps', id: 'web-projects', icon: Globe, color: 'from-[#1f6feb] to-[#da3633]' }
    ];

    // Capture section previews when task view is opened
    useEffect(() => {
        if (isTaskView) {
            const previews = {};
            navItems.forEach(item => {
                const element = document.getElementById(item.id);
                if (element) {
                    // Create a compressed visual representation
                    previews[item.id] = {
                        backgroundColor: getComputedStyle(element).backgroundColor,
                        backgroundImage: getComputedStyle(element).backgroundImage,
                        color: getComputedStyle(element).color,
                        // Capture some representative content
                        hasImages: element.querySelector('img') !== null,
                        hasText: element.textContent?.length > 0,
                        elementHeight: element.offsetHeight
                    };
                }
            });
            setSectionPreviews(previews);
        }
    }, [isTaskView]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            if (isTaskView) {
                setIsTaskView(false);
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const handleNavClick = (href: string, id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setActiveItem(href);

        if (href === '/webapps') {
            navigate('/webapps');
            setIsMobileMenuOpen(false);
            setIsTaskView(false);
            return;
        }

        if (location.pathname !== '/') {
            if (href === '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                navigate(href);
            }
        } else {
            if (href === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsTaskView(false);
            } else {
                scrollToSection(id);
            }
        }

        setIsMobileMenuOpen(false);
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveItem('/');
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsTaskView(false);
        }
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setActiveItem('/dev-contact');
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const contactElement = document.getElementById('dev-contact');
                if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            scrollToSection('dev-contact');
        }
    };

    const toggleTaskView = () => {
        if (!isTaskView) {
            // When opening task view, minimize all sections with animation
            document.querySelectorAll('section').forEach((section, index) => {
                section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.transform = 'scale(0.8) translateY(20px)';
                section.style.opacity = '0.5';
                section.style.pointerEvents = 'none';
            });
        } else {
            // When closing task view, restore all sections
            document.querySelectorAll('section').forEach((section, index) => {
                section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                section.style.transform = 'scale(1) translateY(0)';
                section.style.opacity = '1';
                section.style.pointerEvents = 'auto';
            });
        }
        
        setIsTaskView(!isTaskView);
        
        if (!isTaskView) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleTaskViewCardClick = (sectionId: string) => {
        // First restore all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            section.style.transform = 'scale(1) translateY(0)';
            section.style.opacity = '1';
            section.style.pointerEvents = 'auto';
        });
        
        setIsTaskView(false);
        
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Add a highlight effect when opening
                element.style.transition = 'all 0.3s ease-out';
                element.style.boxShadow = '0 0 0 2px #4E9C7E';
                setTimeout(() => {
                    element.style.boxShadow = 'none';
                }, 1000);
            }
        }, 500);
    };

    const renderSectionPreview = (sectionId) => {
        const preview = sectionPreviews[sectionId];
        
        switch(sectionId) {
            case 'home':
                return (
                    <div className="w-full h-full bg-gradient-to-br from-[#0d1117] to-[#161b22] rounded-lg p-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:12px_12px]"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-2 h-2 bg-[#4E9C7E] rounded-full"></div>
                                <div className="text-white font-mono text-xs">~/home</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="h-0.5 bg-[#4E9C7E]/30 rounded"></div>
                                <div className="h-0.5 bg-[#1f6feb]/30 rounded w-3/4"></div>
                                <div className="h-0.5 bg-[#4E9C7E]/30 rounded w-1/2"></div>
                            </div>
                            <div className="mt-1 flex gap-0.5">
                                {['TS', 'React', 'Node'].map((tech, i) => (
                                    <div key={tech} className="px-1 py-0.5 bg-[#21262d] text-[#7d8590] text-xs font-mono rounded border border-[#30363d]">
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            
            case 'portfolio':
                return (
                    <div className="w-full h-full bg-[#161b22] rounded-lg p-2 relative overflow-hidden border border-[#30363d]">
                        <div className="grid grid-cols-2 gap-0.5 mb-1">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="aspect-video bg-[#21262d] rounded border border-[#30363d] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1f6feb]/20 to-[#4E9C7E]/10"></div>
                                    {i === 1 && <div className="absolute bottom-0.5 left-0.5 right-0.5 h-0.5 bg-[#4E9C7E]/40 rounded"></div>}
                                    {i === 2 && <div className="absolute top-0.5 left-0.5 w-2/3 h-0.5 bg-[#1f6feb]/40 rounded"></div>}
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            <Folder className="w-2 h-2 text-[#1f6feb]" />
                            <div className="text-white font-mono text-xs">projects/</div>
                        </div>
                    </div>
                );
            
            case 'about':
                return (
                    <div className="w-full h-full bg-[#161b22] rounded-lg p-2 relative overflow-hidden border border-[#30363d]">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 bg-gradient-to-r from-[#4E9C7E] to-[#1f6feb] rounded-full"></div>
                                <div className="text-white font-mono text-xs">skills.md</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="flex justify-between">
                                    <span className="text-[#7d8590] text-xs">React</span>
                                    <div className="w-8 h-0.5 bg-[#30363d] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#4E9C7E] rounded-full" style={{width: '90%'}}></div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#7d8590] text-xs">Node.js</span>
                                    <div className="w-8 h-0.5 bg-[#30363d] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#1f6feb] rounded-full" style={{width: '85%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            case 'dev-contact':
                return (
                    <div className="w-full h-full bg-[#161b22] rounded-lg p-2 relative overflow-hidden border border-[#30363d]">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#4E9C7E]" />
                                <div className="text-white font-mono text-xs">contact.sh</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="h-3 bg-[#21262d] rounded border border-[#30363d]"></div>
                                <div className="h-3 bg-[#21262d] rounded border border-[#30363d]"></div>
                                <div className="h-4 bg-[#21262d] rounded border border-[#30363d]"></div>
                            </div>
                            <div className="flex gap-0.5">
                                <div className="flex-1 h-4 bg-[#4E9C7E] rounded border border-[#4E9C7E]"></div>
                                <div className="w-4 h-4 bg-[#21262d] rounded border border-[#30363d]"></div>
                            </div>
                        </div>
                    </div>
                );
            
            default:
                return (
                    <div className="w-full h-full bg-gradient-to-br from-[#161b22] to-[#21262d] rounded-lg p-2 flex items-center justify-center">
                        <div className="text-[#7d8590] font-mono text-xs">Loading...</div>
                    </div>
                );
        }
    };

    return (
        <>
            {/* Ubuntu Dock - Desktop */}
            <div className="hidden lg:flex fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
                <div className="flex flex-col items-center gap-4 p-4 bg-[#0d1117]/90 backdrop-blur-md rounded-2xl border border-[#30363d] shadow-2xl">
                    {/* Logo */}
                    <div className="mb-0">
                        <Link
                            to="/"
                            className="flex items-center justify-center w-12 h-12 transition-all duration-300 group"
                            onClick={handleLogoClick}
                        >
                            <img 
                                src="https://res.cloudinary.com/dll8awuig/image/upload/v1758277912/portfolio/id_u3fqer5lh/m951gqhls5tm8qg5bg8b.png" 
                                alt="logo" 
                                className="w-10 h-10 rounded-lg"
                            />
                        </Link>
                    </div>

                    {/* Dock Items */}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.href;

                        return (
                            <div key={item.name} className="relative group">
                                <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-[#161b22] text-white text-sm font-mono px-3 py-1 rounded border border-[#30363d] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                                    {item.name}
                                </div>

                                {isActive && (
                                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#4E9C7E] rounded-r"></div>
                                )}

                                <Link
                                    to={item.href}
                                    onClick={(e) => handleNavClick(item.href, item.id, e)}
                                    className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group ${isActive
                                            ? 'bg-[#4E9C7E] text-white scale-110'
                                            : 'bg-[#161b22] text-[#7d8590] border border-[#30363d] hover:bg-[#21262d] hover:text-white hover:scale-105 hover:border-[#4E9C7E]'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            </div>
                        );
                    })}

                    <div className="w-8 h-px bg-[#30363d] my-2"></div>

                    {/* Task View Button */}
                    <div className="relative group">
                        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-[#161b22] text-white text-sm font-mono px-3 py-1 rounded border border-[#30363d] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {isTaskView ? 'Close Workspace' : 'Workspace Overview'}
                        </div>
                        <Button
                            onClick={toggleTaskView}
                            className={`w-12 h-12 rounded-xl transition-all duration-300 hover:scale-105 border-0 ${
                                isTaskView 
                                    ? 'bg-[#1f6feb] text-white shadow-lg shadow-[#1f6feb]/30' 
                                    : 'bg-[#161b22] border border-[#30363d] text-[#7d8590] hover:bg-[#21262d] hover:text-white hover:border-[#1f6feb]'
                            }`}
                            size="icon"
                        >
                            {isTaskView ? <Minus className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Contact Button */}
                    <div className="relative group">
                        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-[#161b22] text-white text-sm font-mono px-3 py-1 rounded border border-[#30363d] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            Get In Touch
                        </div>
                        <Button
                            onClick={handleContactClick}
                            className="w-12 h-12 bg-[#4E9C7E] hover:bg-[#5FBB97] text-black rounded-xl transition-all duration-300 hover:scale-105 border-0"
                            size="icon"
                        >
                            <Mail className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Task View Overlay */}
            {isTaskView && (
                <div className="fixed inset-0 bg-[#0d1117]/95 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4 md:p-8 transition-all duration-500 overflow-y-auto">
                    <div className="max-w-6xl w-full py-4">
                        <div className="text-center mb-4 sm:mb-6 md:mb-8">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-mono mb-1 sm:mb-2">Workspace Overview</h2>
                            <p className="text-[#7d8590] font-mono text-xs sm:text-sm">All sections minimized - Click to maximize</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeItem === item.href;
                                
                                return (
                                    <div
                                        key={item.name}
                                        onClick={() => handleTaskViewCardClick(item.id)}
                                        className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                                            isActive ? 'ring-1 sm:ring-2 ring-[#4E9C7E]' : ''
                                        }`}
                                    >
                                        <div className={`bg-[#161b22] rounded-lg sm:rounded-xl p-1 sm:p-2 border transition-all duration-300 ${
                                            isActive 
                                                ? 'border-[#4E9C7E] shadow-lg sm:shadow-2xl shadow-[#4E9C7E]/20' 
                                                : 'border-[#30363d] group-hover:border-[#4E9C7E] group-hover:shadow-md sm:group-hover:shadow-lg'
                                        }`}>
                                            {/* Card Header */}
                                            <div className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 border-b border-[#30363d]">
                                                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className={`font-bold font-mono text-sm sm:text-base ${
                                                        isActive ? 'text-[#4E9C7E]' : 'text-white'
                                                    } truncate`}>
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-[#7d8590] font-mono text-xs truncate">
                                                        {item.name === 'Home' && 'Introduction & Hero'}
                                                        {item.name === 'Portfolio' && 'Projects & Case Studies'}
                                                        {item.name === 'About' && 'Skills & Experience'}
                                                        {item.name === 'Contact' && 'Get Quote & Connect'}
                                                        {item.name === 'Web Apps' && 'Applications & Tools'}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Section Preview */}
                                            <div className="h-20 sm:h-32 md:h-36 lg:h-40 p-1 sm:p-2">
                                                {renderSectionPreview(item.id)}
                                            </div>
                                            
                                            {/* Card Footer */}
                                            <div className="p-2 sm:p-3 border-t border-[#30363d]">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[#7d8590] font-mono text-xs">
                                                        Click to maximize
                                                    </span>
                                                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                                        isActive ? 'bg-[#4E9C7E]' : 'bg-[#30363d]'
                                                    }`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="text-center mt-4 sm:mt-6 md:mt-8">
                            <Button
                                onClick={toggleTaskView}
                                className="bg-[#30363d] hover:bg-[#3d444d] text-white font-mono border-0 px-4 sm:px-6 md:px-8 text-xs sm:text-sm"
                            >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Close Workspace View
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Bottom Navigation Bar */}
            <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                isMobileNavVisible ? 'translate-y-0' : 'translate-y-full'
            } ${
                isScrolled ? 'bg-[#0d1117]/95 backdrop-blur-md border-t border-[#30363d]' : 'bg-[#0d1117]/95 backdrop-blur-md border-t border-[#30363d]'
            }`}>
                <div className="max-w-7xl mx-auto px-2 py-2">
                    <div className="flex justify-between items-center">
                        {navItems.slice(0, 3).map((item) => {
                            const Icon = item.icon;
                            const isActive = activeItem === item.href;

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={(e) => handleNavClick(item.href, item.id, e)}
                                    className={`flex flex-col items-center justify-center w-16 py-2 rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-[#4E9C7E] text-black scale-105'
                                            : 'text-[#7d8590] hover:bg-[#21262d] hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                                    <span className="text-xs font-mono">{item.name}</span>
                                </Link>
                            );
                        })}
                        
                        {/* More menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`flex flex-col items-center justify-center w-16 py-2 rounded-lg transition-all duration-200 ${
                                isMobileMenuOpen
                                    ? 'bg-[#1f6feb] text-white scale-105'
                                    : 'text-[#7d8590] hover:bg-[#21262d] hover:text-white'
                            }`}
                        >
                            <Menu className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
                            <span className="text-xs font-mono">More</span>
                        </button>
                    </div>
                </div>

                {/* Expanded Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 mx-2 bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl">
                        <div className="p-2 sm:p-3">
                            <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3">
                                {navItems.slice(3).map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeItem === item.href;

                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={(e) => handleNavClick(item.href, item.id, e)}
                                            className={`flex items-center gap-1 sm:gap-2 w-full text-left px-2 sm:px-3 py-1 sm:py-2 rounded transition-colors font-mono text-xs sm:text-sm ${
                                                isActive
                                                    ? 'bg-[#4E9C7E] text-black'
                                                    : 'text-[#7d8590] hover:bg-[#21262d] hover:text-white'
                                            }`}
                                        >
                                            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </div>
                            
                            <div className="space-y-1 sm:space-y-2 border-t border-[#30363d] pt-2 sm:pt-3">
                                <Button
                                    onClick={toggleTaskView}
                                    className="w-full bg-[#1f6feb] hover:bg-[#388bfd] text-white font-mono text-xs sm:text-sm py-1.5 sm:py-2"
                                >
                                    <Grid className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Workspace View
                                </Button>
                                <Button
                                    onClick={handleContactClick}
                                    className="w-full bg-[#4E9C7E] hover:bg-[#5FBB97] text-black font-mono text-xs sm:text-sm py-1.5 sm:py-2"
                                >
                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Get In Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Mobile Top Bar (Logo only) */}
            <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
                    <div className="flex justify-between items-center">
                        <Link
                            to="/"
                            className="flex items-center gap-1 sm:gap-2"
                            onClick={handleLogoClick}
                        >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center">
                                <img 
                                    src="https://res.cloudinary.com/dll8awuig/image/upload/v1758277912/portfolio/id_u3fqer5lh/m951gqhls5tm8qg5bg8b.png" 
                                    alt="logo" 
                                    className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                                />
                            </div>
                            <span className={`font-mono font-bold text-sm sm:text-base transition-colors duration-300 ${
                                isScrolled ? 'text-white' : 'text-white'
                            }`}>
                                Dzidzom
                            </span>
                        </Link>

                        {/* Status indicator for mobile */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            <div className="flex gap-0.5 sm:gap-1">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E95420] rounded-full"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#38B44A] rounded-full"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#EDD64D] rounded-full"></div>
                            </div>
                            <span className="text-[#7d8590] text-xs font-mono hidden sm:block">
                                {isTaskView ? 'workspace' : activeItem === '/' ? 'home' : activeItem.replace('/', '')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Top Bar */}
            <div className="hidden lg:block fixed top-0 right-6 z-40">
                <div className="flex items-center gap-2 p-3 bg-[#161b22]/90 backdrop-blur-md rounded-b-2xl border border-[#30363d] border-t-0 shadow-lg">
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#E95420] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#38B44A] rounded-full"></div>
                        <div className="w-2 h-2 bg-[#EDD64D] rounded-full"></div>
                    </div>
                    <span className="text-[#7d8590] text-sm font-mono ml-2">
                        {isTaskView ? 'workspace-view' : activeItem === '/' ? '~' : activeItem.replace('/', '')}
                    </span>
                </div>
            </div>

            {/* Bottom padding for mobile to prevent content from being hidden behind navbar */}
            {/* <div className="lg:hidden pb-20"></div> */}
        </>
    );
};

export default WebNavigation;
import React from "react";
import { Zap } from "lucide-react";

const Footer = () => {
  // Safe matrix utilizing native SVG components for brands prone to version mismatch bugs
  const socialLinks = [
    {
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X (Twitter)",
    },
    {
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      label: "LinkedIn",
    },
    {
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
        </svg>
      ),
      label: "Facebook",
    },
  ];

  const platformLinks = [
    { name: "Courses", href: "#courses" },
    { name: "Instructors", href: "#instructors" },
    { name: "Pricing", href: "#pricing" },
    { name: "Blog", href: "#blog" }
  ];

  const supportLinks = [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Privacy Policy", href: "#privacy" }
  ];

  return (
    <footer className="bg-foreground text-background/60 py-16 px-6 md:px-12 border-t border-background/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Branding Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-md text-primary-foreground">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-background font-mono">
              LearningHub
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs font-sans">
            The ultimate edge online learning platform. Master any skill vector, 
            anywhere, at your own pace with verified elite industry instructors.
          </p>
          
          {/* Social Icons Loop */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href="#"
                aria-label={social.label}
                className="p-2 bg-background/5 border border-background/10 rounded-md hover:text-primary hover:border-primary/50 transition-all text-background hover:cursor-pointer"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Platform Links Column */}
        <div className="space-y-6">
          <h4 className="text-background font-bold text-lg tracking-tight">Platform</h4>
          <ul className="space-y-4 text-sm font-medium">
            {platformLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links Column */}
        <div className="space-y-6">
          <h4 className="text-background font-bold text-lg tracking-tight">Support</h4>
          <ul className="space-y-4 text-sm font-medium">
            {supportLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-primary transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-6">
          <h4 className="text-background font-bold text-lg tracking-tight">Contact</h4>
          <ul className="space-y-4 text-sm text-background/60 font-sans">
            <li><span className="font-semibold text-background/80">Email:</span> hello@learninghub.com</li>
            <li><span className="font-semibold text-background/80">Phone:</span> +40 700 000 000</li>
            <li><span className="font-semibold text-background/80">Address:</span> 1 Innovation St, Bucharest, RO</li>
          </ul>
        </div>
      </div>

      {/* Persistent Static Copyright Bar Footer Layout */}
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-background/10 text-center text-xs text-background/40 font-mono">
        <p>
          &copy; {new Date().getFullYear()} LearningHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
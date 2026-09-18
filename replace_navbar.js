const fs = require('fs');
let code = fs.readFileSync('e:\\Smit-Laptops\\Smit_Status\\SmitStatus\\src\\layout\\Navbar.tsx', 'utf8');

code = code.replace(/import \{ motion, AnimatePresence \} from "framer-motion"/g, 'import { GSAPPresence } from "@/components/ui/GSAPPresence"\nimport { useGSAP } from "@gsap/react"\nimport gsap from "gsap"');
code = code.replace(/<motion\.div/g, '<div');
code = code.replace(/<\/motion\.div>/g, '</div>');
code = code.replace(/<motion\.button/g, '<button');
code = code.replace(/<\/motion\.button>/g, '</button>');
code = code.replace(/<motion\.img/g, '<img');
code = code.replace(/<motion\.nav/g, '<nav');
code = code.replace(/<\/motion\.nav>/g, '</nav>');

fs.writeFileSync('e:\\Smit-Laptops\\Smit_Status\\SmitStatus\\src\\layout\\Navbar.tsx', code);

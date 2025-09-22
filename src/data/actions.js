import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
// Contact actions
export const actions = [
  {
    id: 1,
    Icon: FaPhone,
    href: "tel:+923213268095",
    label: "Call",
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 2,
    Icon: FaWhatsapp,
    href: "https://wa.me/+923213268095",
    label: "WhatsApp",
    gradient: "from-green-500 to-green-700",
  },
  {
    id: 3,
    Icon: FaEnvelope,
    href: "mailto:info@ssi.com",
    label: "Email",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 4,
    Icon: FaFacebookF,
    href: "https://www.facebook.com/share/1GnGfZfxD3/",
    label: "Facebook",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    id: 5,
    Icon: FaInstagram,
    href: "https://www.instagram.com/syed_software_institute",
    label: "Instagram",
    gradient: "from-pink-500 to-purple-600",
  },
];

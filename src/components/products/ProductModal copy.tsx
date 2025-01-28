import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Info, MapPin, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface ProductModalProps {
  product: {
    name: string;
    description?: string;
    price: number;
    images: string[];
    category: string;
    whatsappLink?: string;
    localisation?: Location;
  };
}

export function ProductModal({ product }: ProductModalProps) {
  const getMapLink = (location: Location) => {
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  };

  return (
    <div className="flex items-center justify-between">
      <Modal>
        <ModalTrigger className="bg-secondary/20 backdrop-blur-sm text-secondary-foreground hover:bg-secondary/30 border border-white/20 rounded-full p-2 relative overflow-hidden group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-8 text-center transition-all duration-500">
            <Eye size={16} />
          </span>
          <div className="-translate-x-8 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition-all duration-500 text-black">
            {/* <Info size={16} /> */}
          </div>
        </ModalTrigger>
        
        <ModalBody>
          <ModalContent className="  h-screen   backdrop-blur-xl border border-white/10 shadow-2xl">
       
            
            <div className="relative z-10">
              <h4 className="text-lg  md:text-2xl text-white font-bold text-center mb-8 flex items-center justify-between gap-3">
                <span>{product.name}</span>
                <span className="px-2 py-1 rounded-full text-sm  border ">
                  {product.category}
                </span>
              </h4>

              <div className="flex justify-center items-center mb-8">
                {product.images.map((image, idx) => (
                  <motion.div
                    key={`image-${idx}`}
                    style={{ rotate: Math.random() * 20 - 10 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                    whileTap={{ scale: 1.8, rotate: 0, zIndex: 100 }}
                    className="rounded-2xl -mr-4 p-1 "
                  >
                    <Image
                      src={image}
                      alt={`${product.name} image ${idx + 1}`}
                      width="500"
                      height="500"
                      className="rounded-xl h-20 w-20 md:h-40 md:w-40 object-cover"
                    />
                  </motion.div>
                ))}
              </div>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-white">
                        {product.price}€
                      </span>
                    </div>
                    {product.description && (
                      <p className="text-white/80 text-sm">
                        {product.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    {product.whatsappLink && (
                      <Button variant="outline"  className="  bg-white/10 border-white/20 hover:bg-white/20 text-white w-1/2">
                        <a
                          href={`https://wa.me/${product.whatsappLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <FaWhatsapp className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </Button>
                    )}

                    {product.localisation && (
                      <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white w-full">
                        <a
                          href={getMapLink(product.localisation)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          <span className='hidden lg:flex'>
                           Google Maps
                          </span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 border-none">
                Ajouter
                <ShoppingBag className="w-5 h-5" />
              </Button>


            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
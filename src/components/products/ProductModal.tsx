"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import {  Eye, Info, MapPin, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

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
        <ModalTrigger className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/30  border-[1px] border-secondary/40  dark:text-white text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          <Eye size={16} />
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <Info size={16} />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              {product.name}{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                {product.category}
              </span>
            </h4>
            <div className="flex justify-center items-center">
              {product.images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.8,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${product.name} image ${idx + 1}`}
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>


            <Card className="my-5 flex flex-1 p-4  ">
              <CardContent className="p-2  w-2/3">
                <div >

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                      Prix: {product.price}€
                    </span>
                  </div>
                  {product.description && (
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-4">
                      {product.description}
                    </p>
                  )}

                </div>

              </CardContent>

              <CardContent className="flex justify-center  flex-col gap-y-4 ">
                <div >

                  <Button variant="outline" className="w-full" disabled={!product.whatsappLink} >
                    <a
                      href={product.whatsappLink ? `https://wa.me/${product.whatsappLink}` : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" flex flex-col items-center "
                    >
                      <FaWhatsapp className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>

                </div>

                <div>
                  {product.localisation && (
                    <Button variant="outline" className="w-full" >
                      <a
                        href={getMapLink(product.localisation)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <MapPin className="w-4 h-4 mr-2 " />
                        <span> <span className="hidden md:inline" >Voir sur</span> Google Maps</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>

            </Card>
      
              <Button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Ajouter <ShoppingBag className="ml-2 w-5 h-5"/>
              </Button>

          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}


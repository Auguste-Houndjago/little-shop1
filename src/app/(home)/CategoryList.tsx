
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const animals = [
    {key: "1", href: "#", name:"chaussures special" , img: "/images/shoes4.jpg"},
    {key: "2", href: "#", name:"accessoires d'enfants", img: "/images/fashion1.jpg"},
    {key: "3", href: "#", name:"parfum chic", img: "/images/parfum.jpg"},
    {key: "4", href: "#", name:"accesoir de modes", img: "/images/accesoir6.jpg"},
    {key: "5", href: "#", name:"accessoires de voyage", img: "/images/accesoir4.jpeg"},


  ];

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {animals.map((item:any) => (
          <Link
            href={`#`}
            className="flex-shrink-0 w-full rounded-sm border-1 sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={item.img}
                alt={item.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

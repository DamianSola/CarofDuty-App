import Logo from "./logoBlue.png";
import Image from "next/image";

const BrandHome = ({brand}) => {
    return (
       <div className="hidden md:flex md:flex-wrap md:w-1/2 justify-center gap-4 p-2">
  {brand.brands ? (
    brand.brands.map((b, index) => (
      <div className='flex flex-col items-center p-4 rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105'
      key={index}>
        <img 
          src={b.image}
          width='100' 
          height='100' 
          alt={`brand-img-${b.name}`}
          className='object-cover rounded-md'
        />
      </div>
    ))
  ) : (
    <div className="flex flex-col items-center justify-start h-screen w-full text-center">
      <Image 
        width='300' 
        height='300' 
        className="mb-4" 
        src={Logo}
        alt="Loading animation"
      />
      <h2 className="text-lg font-semibold text-gray-700">CARGANDO DATOS...</h2>
    </div>
  )}
</div>

    )
}


export default BrandHome;
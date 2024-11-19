import Logo from "./logoBlue.png";
import Image from "next/image";

const BrandHome = ({brand}) => {
    return (
       <div className="flex flex-wrap w-full justify-center gap-4 p-2">
          {brand.brands ? (
              brand.brands.slice(2).map((b, index) => (
              <div className='flex flex-col items-center p-2 w-fit rounded-lg bg-gray-200 shadow-lg transition-transform duration-300 hover:scale-105'
              key={index}>
              <img 
              src={b.image}
              width='90' 
              height='90' 
              alt={`brand-img-${b.name}`}
              className='object-cover rounded-md m-auto'
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
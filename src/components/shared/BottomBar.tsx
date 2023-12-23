import { bottombarLinks } from "@/constants"
import { INavLink } from "@/types"
import { Link, useLocation } from "react-router-dom"

const BottomBar = () => {
  const { pathname } = useLocation()
  return (
    <section className="bottom-bar">
         {bottombarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route

            return (
            <li 
              key={link.label} 
              className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}>
              <Link
                to={link.route}
                className='flex gap-4 items-center p-4'
              >
                <img 
                  src={link.imgURL}
                  alt={link.label}
                  width={16}
                  height={16}
                  className={`${isActive && 'invert-white'}`}
                />

                <p className="tiny-medium text-light-2">
                    {link.label}
                </p>
              </Link>
            </li>
            )
          })}

    </section>
  )
}

export default BottomBar
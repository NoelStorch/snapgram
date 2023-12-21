import { useState, useEffect } from 'react'

/**
 * @component **DarkModeButton**
 * @param {Object} props >`className` `textTrue`
 * @param {string} props.className - Clases adicionales para el botón.
 * @param {boolean} props.textTrue - Indica si se muestra el texto del botón.
 * @returns _Elemento del botón de modo oscuro._
 */
interface DarkModeButtonProps {
    className?: string;
    textTrue?: boolean;
  }

const DarkModeButton: React.FC<DarkModeButtonProps> = ({ className, textTrue }) => {

  /** estados */
  const [dark, setDark] = useState(localStorage.getItem('dark') === 'true')

  /** cambiar a modo noche y dia */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    setDark(dark)
  }, [dark])

  /** Esta función alterna un estado de modo oscuro y lo guarda en el almacenamiento local */
  const handleClickListener = () => {
    setDark(!dark)
    localStorage.setItem('dark', (!dark).toString())
  }

  return (
    <button
      className={`text-white px-4 p-2 ${className}`}
      onClick={handleClickListener}
    >
      {textTrue === true && (dark ?
        <p className='text-gray-300 hover:text-white text-sm'>Modo dia </p> :
        <p className='text-gray-700 text-sm'>Modo Noche</p>
      )
      }
      {dark ? (
        <svg xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-sun'
          width={textTrue ? '25' : '37'}
          height={textTrue ? '25' : '37'}
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#fff'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <circle cx='12' cy='12' r='4' />
          <path d='M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7' />
        </svg>
      )
        : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-moon'
            width={textTrue ? '25' : '37'}
            height={textTrue ? '25' : '37'}
            viewBox='0 0 24 24'
            fill='#525252'
          >
            <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454' />
          </svg>
        )
      }
    </button>
  )
}

export default DarkModeButton

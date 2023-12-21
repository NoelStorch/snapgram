
export function isDarkMode() {
    if (localStorage.getItem('dark') === 'true') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return 
  }
  
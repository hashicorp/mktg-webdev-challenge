// A basic button to serve as an example of a component
// and also to bring you from the instructions page to the template!

import s from './style.module.css'

export default function Button({ children, href }) {
  return (
    <a className={`button ${s.root}`} href={href}>
      {children}
    </a>
  )
}

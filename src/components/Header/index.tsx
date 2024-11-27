interface HeaderProps {
    title: string
}

const Header = (props: HeaderProps) => {
  return (
    <h1 className="text-4xl font-bold text-slate-900">{props.title}</h1>
  )
}

export default Header
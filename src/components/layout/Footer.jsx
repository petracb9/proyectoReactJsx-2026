import './Footer.css'


  const teamMembers = [
    { name: "Lisy",
      role: "Marketing", 
      email: "lis@tropicglass.com" },
    { name: "Josue", 
      role: "Asesor comercial", 
      email: "josue@tropicglass.com" },
    { name: "Patricia", 
      role: "Diseñadora", 
      email: "patricia@tropicglass.com" },
  ]
 
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h3>TropicGlass</h3>
        <p>Diseñamos vasos personalizados para cócteles desde Buenos Aires, Argentina.</p>
        <p>Email: contacto@tropicglass.com | CABA, Argentina</p>
      </div>

      <div className="footer-team">
        <h4>Nuestro equipo</h4>
        <div className="team-cards">
          {teamMembers.map((member) => (
            <div key={member.name} className="team-card">
              <strong>{member.name}</strong>
              <span>{member.role}</span>
              <a href={member.email}>Email</a>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TropicGlass. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}  

export default Footer
import { useState } from 'react';
import Terms from './Terms';
import diegoGonzalezAvatar from '../assets/perfil/diego-gonzalez.jfif';
import agustinAvellanedaAvatar from '../assets/perfil/agustin-avellaneda.jfif'; 
import andreaLaurinoAvatar from '../assets/perfil/andrea-laurino.jfif'; 
import angelicaBorreroAvatar from '../assets/perfil/angelica-borrero.jfif'; 
import clarisaGorostidiAvatar from '../assets/perfil/clarisa-gorostidi.webp'; 
import diegoRaulAvatar from '../assets/perfil/diego-raul.jfif'; 
import matiasAcevedoAvatar from '../assets/perfil/matias-acevedo.jfif'; 
import efrenMoralesAvatar from '../assets/perfil/efren-morales.jfif'; 
import fabianCarabajalAvatar from '../assets/perfil/fabian-carabajal.jfif'; 
import francoLacourtAvatar from '../assets/perfil/franco-lacourt.jfif'; 
import santiagoFigliuoloAvatar from '../assets/perfil/santiago-figliuolo.jfif'; 
import juanPachecoAvatar from '../assets/perfil/juan-pacheco.jfif';
const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers = [
    {
      name: 'Diego Gonzalez',
      role: 'TL',
      linkedin: 'https://www.linkedin.com/in/diego-gonzalez-7937aa16/',
      avatar: diegoGonzalezAvatar,
    },
    {
      name: 'Agustín Avellaneda',
      role: 'PM y Front',
      linkedin: 'https://www.linkedin.com/in/avellaneda-agust%C3%ADn-tns/',
      avatar: agustinAvellanedaAvatar,
    },
    {
      name: 'Andrea Laurino',
      role: 'QA',
      linkedin: 'https://www.linkedin.com/in/andrea-laurino/',
      avatar: andreaLaurinoAvatar,
    },
    {
      name: 'Clarisa Gorostidi',
      role: 'QA',
      linkedin: 'https://www.linkedin.com/in/clarisag/',
      avatar: clarisaGorostidiAvatar,
    },
    {
      name: 'Diego Raúl',
      role: 'Front',
      linkedin: 'https://www.linkedin.com/in/diego-raul-barrionuevo/',
      avatar: diegoRaulAvatar,
    },
    {
      name: 'Matias Nicolas Acevedo',
      role: 'Front',
      linkedin: 'https://www.linkedin.com/in/matias-nicolas-acevedo/',
      avatar: matiasAcevedoAvatar,
    },
    {
      name: 'Angelica Borrero',
      role: 'UX/UI',
      linkedin: 'https://www.linkedin.com/in/ang%C3%A9lica-borrero-b14591186/',
      avatar: angelicaBorreroAvatar,
    },
    {
      name: 'Efrén Morales',
      role: 'Back',
      linkedin: 'https://www.linkedin.com/in/efren-morales-00029a27a/',
      avatar: efrenMoralesAvatar,
    },
    {
      name: 'Fabian Carabajal',
      role: 'Back',
      linkedin: 'https://www.linkedin.com/in/fabian1501/',
      avatar: fabianCarabajalAvatar,
    },
    {
      name: 'Franco Lacourt',
      role: 'Back',
      linkedin: 'https://www.linkedin.com/in/franco-lacourt-b32a41190/',
      avatar: francoLacourtAvatar,
    },
    {
      name: 'Santiago Figliuolo',
      role: 'Back',
      linkedin: 'https://www.linkedin.com/in/santiago-figliuolo/',
      avatar: santiagoFigliuoloAvatar,
    },
    {
      name: 'Juan Pacheco',
      role: 'Back',
      linkedin: 'https://www.linkedin.com/in/juan-daniel-pacheco-perez-8ba292183/',
      avatar: juanPachecoAvatar,
    },
  ];

  return (
    <footer className="bg-[#8DB600] py-5 -mb-8 w-full overflow-hidden">
      <div className="mt-8 text-center lg:mx-auto mx-5">
        <p className="text-black font-semibold">
          2024 &copy; WoodWork. Todos los derechos reservados.
        </p>
        <p
          className="text-black font-thin hover:scale-110 transition-transform duration-300"
          style={{
            textShadow:
              '1px 1px 2px #303030, 0 0 1em #303030, 0 0 0.2em #303030',
            cursor: 'pointer', 
          }}
          onClick={() => setIsModalOpen(true)} 
        >
          No-Country | s15-17-t-java-react
        </p>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl max-h-[96vh] overflow-y-auto">
              <h2 className="text-3xl text-[#323E1D] font-bold mb-4">
                Equipo s15-17-t-java-react
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div className="flex bg-zinc-200 items-center p-2 border rounded-lg">
                  <img
                    src={member.avatar || 'https://via.placeholder.com/150'}
                    alt={`${member.name}'s avatar`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-center">{member.name}</p>
                    <div className="flex items-center mt-1">
                      <p className="text-sm">{member.role}</p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
                
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)} 
                className="mt-4 px-4 py-2 text-white bg-[#31543D] hover:bg-[#A67C52] rounded-lg"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        <Terms />
      </div>
    </footer>
  );
};

export default Footer;

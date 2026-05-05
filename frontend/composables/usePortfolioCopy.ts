import { computed } from 'vue'
import type { ExperienceItem, PersonalInfo, ProjectItem } from '~/stores/cvStore'

export type Locale = 'es' | 'en' | 'de' | 'ru'

export const localeOptions: Array<{ code: Locale; label: string; name: string }> = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'ru', label: 'RU', name: 'Русский' },
]

type LocaleCopy = {
  ui: {
    languageLabel: string
    loadingTitle: string
    loadingText: string
    heroTerminalTitle: string
    heroPhotoTitle: string
    heroGreeting: (name?: string) => string
    heroCommand: string
    heroGithub: string
    heroLinkedin: string
    homeIntroEyebrow: string
    homeIntroTitle: string
    homeIntroBody: string
    projectsTitle: string
    projectsSubtitle: string
    experienceTitle: string
    experienceSubtitle: string
    skillsTitle: string
    skillsSubtitle: string
    skillsTechnologiesTitle: string
    contactEyebrow: string
    contactTitle: string
    contactBody: string
    contactEmailLabel: string
    contactGithubLabel: string
    contactLinkedinLabel: string
    contactButton: string
    footer: (year: number) => string
    dates: {
      present: string
      inProgress: string
    }
    projectDetail: {
      backLink: string
      descriptionTitle: string
      technologiesTitle: string
      linksTitle: string
      dateTitle: string
      galleryTitle: string
      collaborateTitle: string
      collaborateBody: string
      collaborateButton: string
      openLink: string
    }
    contactPage: {
      title: string
      subtitle: string
      nameLabel: string
      emailLabel: string
      messageLabel: string
      namePlaceholder: string
      emailPlaceholder: string
      messagePlaceholder: string
      submit: string
      submitting: string
      success: string
      requiredError: string
      nameLengthError: string
      messageLengthError: string
      sendError: string
      charCounter: (current: number, max: number) => string
    }
  }
  content: {
    profile: {
      title: string
      summary: string
    }
    experiences: Record<string, { position: string; description: string[] }>
    skills: {
      categories: Record<string, string>
      softSkillsTitle: string
      softSkillsItems: string[]
      chartLabel: string
    }
    projects: Record<string, { shortDescription: string; description: string }>
  }
}

const localeTags: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en-US',
  de: 'de-DE',
  ru: 'ru-RU',
}

const localeCopies: Record<Locale, LocaleCopy> = {
  es: {
    ui: {
      languageLabel: 'Idioma',
      loadingTitle: 'javier@portfolio:~',
      loadingText: '$ cargando currículum...',
      heroTerminalTitle: 'javier@portfolio:~',
      heroPhotoTitle: 'photo.png',
      heroGreeting: (name?: string) => (name ? `Hola, soy ${name}` : 'Hola, bienvenido'),
      heroCommand: 'cat profile.txt',
      heroGithub: '$ github',
      heroLinkedin: '$ linkedin',
      homeIntroEyebrow: 'Sobre mí',
      homeIntroTitle: 'Software útil, investigación y creatividad',
      homeIntroBody: 'Aquí reúno mi trayectoria, proyectos y habilidades técnicas en un solo lugar.',
      projectsTitle: '$ projects --featured',
      projectsSubtitle: '// Proyectos en los que he trabajado',
      experienceTitle: '$ experience --timeline',
      experienceSubtitle: '// Trayectoria profesional y académica',
      skillsTitle: '$ skills --list',
      skillsSubtitle: '// Tecnologías y herramientas',
      skillsTechnologiesTitle: '// Tecnologías',
      contactEyebrow: 'Contacto',
      contactTitle: '¿Quieres hablar sobre un proyecto?',
      contactBody:
        'Si tienes una idea, proyecto o propuesta, no dudes en contactarme. Estoy abierto a colaboraciones y nuevas oportunidades.',
      contactEmailLabel: 'email',
      contactGithubLabel: 'github',
      contactLinkedinLabel: 'linkedin',
      contactButton: '$ contacto --nuevo',
      footer: (year: number) => `// ${year} — javier sepúlveda — hecho con nuxt 3 + fastapi`,
      dates: {
        present: 'Actualidad',
        inProgress: 'En desarrollo',
      },
      projectDetail: {
        backLink: '← $ cd ..',
        descriptionTitle: '$ cat description.txt',
        technologiesTitle: '// Tecnologías',
        linksTitle: '// Enlaces',
        dateTitle: '// Fecha',
        galleryTitle: '$ ls ./gallery',
        collaborateTitle: '¿Interesado en colaborar?',
        collaborateBody: 'Si te gustan los proyectos que has visto, me encantaría hablar contigo.',
        collaborateButton: '$ contacto --nuevo',
        openLink: '$ open',
      },
      contactPage: {
        title: '$ contacto --info',
        subtitle: '// Déjame un mensaje',
        nameLabel: 'nombre',
        emailLabel: 'email',
        messageLabel: 'mensaje',
        namePlaceholder: 'tu nombre completo',
        emailPlaceholder: 'tu@email.com',
        messagePlaceholder: 'cuéntame tu idea...',
        submit: '$ enviar mensaje',
        submitting: '$ enviando...',
        success: '// ✓ Mensaje recibido. Te responderé pronto.',
        requiredError: 'Por favor completa todos los campos',
        nameLengthError: 'El nombre debe tener entre 2 y 100 caracteres.',
        messageLengthError: 'El mensaje debe tener entre 10 y 2000 caracteres.',
        sendError: 'Error enviando el mensaje. Intenta de nuevo.',
        charCounter: (current: number, max: number) => `${current} / ${max}`,
      },
    },
    content: {
      profile: {
        title: 'Estudiante de 5to año de Ingeniería Civil Informática',
        summary:
          'Estudiante de 5to año de Ingeniería Civil Informática apasionado por construir software y herramientas que voy viendo necesario en mi vida y que pueden ser útil a más gente. Tengo experiencia en investigación y soy co-autor de una publicación de optimización de cronogramas hospitalarios. Me apasionan la música y los videojuegos.',
      },
      experiences: {
        'exp-programming': {
          position: 'Ayudante de Programación — SimulaPUCV',
          description: [
            'Desarrollo y programación de SimulaPUCV, herramienta de simulación de generaciones universitarias, bajo la dirección de profesor.',
            'Implementación de módulos de simulación, análisis de datos y visualización de resultados. Traslado de código de MatLab a Go.',
          ],
        },
        'exp-research': {
          position: 'Ayudante de Investigación',
          description: [
            'Investigación en metaheurísticas aplicadas a problemas NP-hard como Set Covering Problem y Roman Domination Problem.',
            'Co-autor de paper publicado en optimización de cronogramas hospitalarios.',
            'Desarrollo de soluciones algorítmicas y análisis de rendimiento de diferentes enfoques de optimización.',
          ],
        },
        'exp-teaching': {
          position: 'Ayudante de Asignaturas',
          description: [
            'Ayudantías en Fundamentos de Algoritmos, Fundamentos de Programación, Estructuras de Datos, Análisis y Diseño de Algoritmos y Programación Avanzada.',
            'Preparación de material didáctico, evaluación de trabajos y apoyo a estudiantes en resolución de problemas de programación.',
            'Liderazgo de sesiones prácticas con grupos de 20+ estudiantes.',
          ],
        },
        'exp-security': {
          position: 'Guardia de Seguridad — Central de Monitoreo',
          description: [
            'Monitoreo de cámaras de vigilancia en central de seguridad.',
            'Gestión de incidencias y coordinación con equipos en terreno.',
          ],
        },
      },
      skills: {
        categories: {
          Lenguajes: 'Lenguajes',
          Frontend: 'Frontend',
          Backend: 'Backend',
          Datos: 'Datos',
          DevOps: 'DevOps',
          Otros: 'Otros',
          'Habilidades Blandas': 'Habilidades Blandas',
        },
        softSkillsTitle: 'Habilidades Blandas',
        softSkillsItems: [
          'Adaptabilidad tecnológica',
          'Aprendizaje autónomo',
          'Trabajo en equipo',
          'Resolución de problemas',
          'Pensamiento analítico',
          'Comunicación efectiva',
          'Gestión y planificación de proyectos',
          'Responsabilidad',
        ],
        chartLabel: 'Competencia',
      },
      projects: {
        simulapucv: {
          shortDescription: 'Herramienta de análisis y simulación de generaciones universitarias',
          description:
            'SimulaPUCV es una plataforma interactiva de simulación diseñada para analizar y simular generaciones universitarias completas. Permite visualizar el comportamiento de cohortes estudiantiles a lo largo del tiempo, modelando inscripción, rendimiento académico y tasas de graduación. Construida con React y Go para máximo rendimiento, con PostgreSQL como motor de datos.',
        },
        omnidesk: {
          shortDescription: 'Organizador personal multiplataforma con sincronización en la nube',
          description:
            'OmniDesk es un organizador personal disponible como página web y aplicación móvil. Ofrece gestión de tareas, listas, notas, calendario y notificaciones personalizables con sincronización en tiempo real entre dispositivos. Stack moderno con arquitectura escalable diseñada para productividad real.',
        },
        jamspace: {
          shortDescription: 'Aplicación para gestionar datos de banda musical',
          description:
            'JamSpace es una aplicación diseñada para bandas musicales que permite gestionar audios, ideas, letras y material creativo de forma centralizada. Incluye grabación, organización de sesiones y colaboración entre miembros de la banda.',
        },
        interiortwin: {
          shortDescription: 'Aplicación AR para diseño de interiores con objetos escaneados',
          description:
            'InteriorTwin es una aplicación desarrollada en Unity que permite mover, reescalar y colocar objetos en entornos interiores con simulación de físicas realistas. La característica distintiva es que los objetos son modelos escaneados de la realidad, permitiendo una experiencia de diseño de interiores auténtica. Proyecto desarrollado en equipo durante la carrera universitaria.',
        },
        loopmania: {
          shortDescription: 'Videojuego educativo que enseña programación mediante gameplay',
          description:
            'LoopMania es un videojuego educativo desarrollado en Unity donde el jugador avanza colocando órdenes de forma similar a escribir código. El juego enseña el uso de loops, secuencias y lógica de programación de forma interactiva y entretenida. Desarrollado en colaboración con un compañero de universidad.',
        },
      },
    },
  },
  en: {
    ui: {
      languageLabel: 'Language',
      loadingTitle: 'javier@portfolio:~',
      loadingText: '$ loading curriculum...',
      heroTerminalTitle: 'javier@portfolio:~',
      heroPhotoTitle: 'photo.png',
      heroGreeting: (name?: string) => (name ? `Hi, I am ${name}` : 'Hi, welcome'),
      heroCommand: 'cat profile.txt',
      heroGithub: '$ github',
      heroLinkedin: '$ linkedin',
      homeIntroEyebrow: 'About me',
      homeIntroTitle: 'Useful software, research, and creativity',
      homeIntroBody: 'I bring my background, projects, and technical skills together in one place.',
      projectsTitle: '$ projects --featured',
      projectsSubtitle: '// Projects I have worked on',
      experienceTitle: '$ experience --timeline',
      experienceSubtitle: '// Professional and academic journey',
      skillsTitle: '$ skills --list',
      skillsSubtitle: '// Technologies and tools',
      skillsTechnologiesTitle: '// Technologies',
      contactEyebrow: 'Contact',
      contactTitle: 'Want to talk about a project?',
      contactBody: "If you have an idea, project, or proposal, feel free to reach out. I'm open to collaborations and new opportunities.",
      contactEmailLabel: 'email',
      contactGithubLabel: 'github',
      contactLinkedinLabel: 'linkedin',
      contactButton: '$ contact --new',
      footer: (year: number) => `// ${year} — javier sepúlveda — built with nuxt 3 + fastapi`,
      dates: {
        present: 'Present',
        inProgress: 'In progress',
      },
      projectDetail: {
        backLink: '← $ cd ..',
        descriptionTitle: '$ cat description.txt',
        technologiesTitle: '// Technologies',
        linksTitle: '// Links',
        dateTitle: '// Date',
        galleryTitle: '$ ls ./gallery',
        collaborateTitle: 'Interested in collaborating?',
        collaborateBody: "If you like the projects you have seen, I'd love to talk to you.",
        collaborateButton: '$ contact --new',
        openLink: '$ open',
      },
      contactPage: {
        title: '$ contact --info',
        subtitle: '// Leave me a message',
        nameLabel: 'name',
        emailLabel: 'email',
        messageLabel: 'message',
        namePlaceholder: 'your full name',
        emailPlaceholder: 'you@example.com',
        messagePlaceholder: 'tell me your idea...',
        submit: '$ send message',
        submitting: '$ sending...',
        success: '// ✓ Message received. I will reply soon.',
        requiredError: 'Please complete all fields',
        nameLengthError: 'The name must be between 2 and 100 characters.',
        messageLengthError: 'The message must be between 10 and 2000 characters.',
        sendError: 'There was an error sending the message. Please try again.',
        charCounter: (current: number, max: number) => `${current} / ${max}`,
      },
    },
    content: {
      profile: {
        title: '5th-year Computer Engineering student',
        summary:
          '5th-year Computer Engineering student passionate about building software and tools that I find useful in my own life and that can help more people. I have research experience and I am a co-author of a paper on hospital schedule optimization. I am passionate about music and video games.',
      },
      experiences: {
        'exp-programming': {
          position: 'Programming Assistant — SimulaPUCV',
          description: [
            'Development and programming of SimulaPUCV, a university cohort simulation tool, under faculty supervision.',
            'Implementation of simulation modules, data analysis, and result visualization. Migration of code from MatLab to Go.',
          ],
        },
        'exp-research': {
          position: 'Research Assistant',
          description: [
            'Research in metaheuristics applied to NP-hard problems such as Set Covering Problem and Roman Domination Problem.',
            'Co-author of a published paper on hospital schedule optimization.',
            'Development of algorithmic solutions and performance analysis of different optimization approaches.',
          ],
        },
        'exp-teaching': {
          position: 'Teaching Assistant',
          description: [
            'Teaching assistance in Foundations of Algorithms, Programming Foundations, Data Structures, Algorithm Analysis and Design, and Advanced Programming.',
            'Preparation of teaching materials, grading, and support for students solving programming problems.',
            'Led practical sessions with groups of 20+ students.',
          ],
        },
        'exp-security': {
          position: 'Security Guard — Monitoring Center',
          description: [
            'Surveillance camera monitoring in a security control center.',
            'Incident handling and coordination with field teams.',
          ],
        },
      },
      skills: {
        categories: {
          Lenguajes: 'Languages',
          Frontend: 'Frontend',
          Backend: 'Backend',
          Datos: 'Data',
          DevOps: 'DevOps',
          Otros: 'Other',
          'Habilidades Blandas': 'Soft Skills',
        },
        softSkillsTitle: 'Soft Skills',
        softSkillsItems: [
          'Technological adaptability',
          'Self-directed learning',
          'Teamwork',
          'Problem solving',
          'Analytical thinking',
          'Effective communication',
          'Project management and planning',
          'Responsibility',
        ],
        chartLabel: 'Proficiency',
      },
      projects: {
        simulapucv: {
          shortDescription: 'Analytics and simulation tool for university cohorts',
          description:
            'SimulaPUCV is an interactive simulation platform designed to analyze and simulate full university cohorts. It visualizes student cohort behavior over time, modeling enrollment, academic performance, and graduation rates. Built with React and Go for maximum performance, using PostgreSQL as the data engine.',
        },
        omnidesk: {
          shortDescription: 'Cross-platform personal organizer with cloud sync',
          description:
            'OmniDesk is a personal organizer available as both a web app and a mobile app. It offers task, list, note, and calendar management with customizable notifications and real-time synchronization across devices. A modern stack with scalable architecture designed for real productivity.',
        },
        jamspace: {
          shortDescription: 'Band data management application',
          description:
            'JamSpace is an application designed for music bands that centralizes audio, ideas, lyrics, and creative materials. It includes recording, session organization, and collaboration between band members.',
        },
        interiortwin: {
          shortDescription: 'AR interior design app with scanned objects',
          description:
            'InteriorTwin is an application built in Unity that lets users move, resize, and place objects in interior environments with realistic physics simulation. Its distinctive feature is that the objects are scanned real-world models, enabling an authentic interior design experience. The project was developed as a team during university studies.',
        },
        loopmania: {
          shortDescription: 'Educational video game that teaches programming through gameplay',
          description:
            'LoopMania is an educational video game built in Unity where the player progresses by placing commands in a way similar to writing code. The game teaches loops, sequences, and programming logic in an interactive and entertaining way. Developed in collaboration with a university colleague.',
        },
      },
    },
  },
  de: {
    ui: {
      languageLabel: 'Sprache',
      loadingTitle: 'javier@portfolio:~',
      loadingText: '$ lade Lebenslauf...',
      heroTerminalTitle: 'javier@portfolio:~',
      heroPhotoTitle: 'photo.png',
      heroGreeting: (name?: string) => (name ? `Hallo, ich bin ${name}` : 'Hallo und willkommen'),
      heroCommand: 'cat profile.txt',
      heroGithub: '$ github',
      heroLinkedin: '$ linkedin',
      homeIntroEyebrow: 'Über mich',
      homeIntroTitle: 'Nützliche Software, Forschung und Kreativität',
      homeIntroBody: 'Hier bündle ich meinen Werdegang, Projekte und technischen Fähigkeiten an einem Ort.',
      projectsTitle: '$ projects --featured',
      projectsSubtitle: '// Projekte, an denen ich gearbeitet habe',
      experienceTitle: '$ experience --timeline',
      experienceSubtitle: '// Beruflicher und akademischer Werdegang',
      skillsTitle: '$ skills --list',
      skillsSubtitle: '// Technologien und Werkzeuge',
      skillsTechnologiesTitle: '// Technologien',
      contactEyebrow: 'Kontakt',
      contactTitle: 'Möchtest du über ein Projekt sprechen?',
      contactBody:
        'Wenn du eine Idee, ein Projekt oder einen Vorschlag hast, melde dich gern. Ich bin offen für Zusammenarbeit und neue Möglichkeiten.',
      contactEmailLabel: 'email',
      contactGithubLabel: 'github',
      contactLinkedinLabel: 'linkedin',
      contactButton: '$ kontakt --neu',
      footer: (year: number) => `// ${year} — javier sepúlveda — erstellt mit nuxt 3 + fastapi`,
      dates: {
        present: 'Aktuell',
        inProgress: 'In Bearbeitung',
      },
      projectDetail: {
        backLink: '← $ cd ..',
        descriptionTitle: '$ cat description.txt',
        technologiesTitle: '// Technologien',
        linksTitle: '// Links',
        dateTitle: '// Datum',
        galleryTitle: '$ ls ./gallery',
        collaborateTitle: 'Interesse an einer Zusammenarbeit?',
        collaborateBody: 'Wenn dir die Projekte gefallen, die du gesehen hast, würde ich gern mit dir sprechen.',
        collaborateButton: '$ kontakt --neu',
        openLink: '$ open',
      },
      contactPage: {
        title: '$ kontakt --info',
        subtitle: '// Hinterlasse mir eine Nachricht',
        nameLabel: 'name',
        emailLabel: 'email',
        messageLabel: 'nachricht',
        namePlaceholder: 'dein vollständiger Name',
        emailPlaceholder: 'dein@email.de',
        messagePlaceholder: 'erzähl mir deine Idee...',
        submit: '$ nachricht senden',
        submitting: '$ wird gesendet...',
        success: '// ✓ Nachricht erhalten. Ich antworte bald.',
        requiredError: 'Bitte alle Felder ausfüllen',
        nameLengthError: 'Der Name muss zwischen 2 und 100 Zeichen lang sein.',
        messageLengthError: 'Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein.',
        sendError: 'Fehler beim Senden der Nachricht. Bitte versuche es erneut.',
        charCounter: (current: number, max: number) => `${current} / ${max}`,
      },
    },
    content: {
      profile: {
        title: 'Student im 5. Jahr der Computertechnik',
        summary:
          'Student im 5. Jahr der Computertechnik mit Leidenschaft für Software und Werkzeuge, die ich in meinem eigenen Alltag nützlich finde und die auch anderen helfen können. Ich habe Forschungserfahrung und bin Mitautor einer Veröffentlichung zur Optimierung von Krankenhausplänen. Musik und Videospiele begeistern mich.',
      },
      experiences: {
        'exp-programming': {
          position: 'Programmierungsassistent — SimulaPUCV',
          description: [
            'Entwicklung und Programmierung von SimulaPUCV, einem Simulationswerkzeug für universitäre Jahrgänge, unter Anleitung eines Professors.',
            'Implementierung von Simulationsmodulen, Datenanalyse und Ergebnisvisualisierung. Überführung des Codes von MatLab nach Go.',
          ],
        },
        'exp-research': {
          position: 'Forschungsassistent',
          description: [
            'Forschung zu Metaheuristiken für NP-schwere Probleme wie Set Covering Problem und Roman Domination Problem.',
            'Mitautor eines veröffentlichten Papers zur Optimierung von Krankenhausplänen.',
            'Entwicklung algorithmischer Lösungen und Leistungsanalyse verschiedener Optimierungsansätze.',
          ],
        },
        'exp-teaching': {
          position: 'Tutor / Lehrassistent',
          description: [
            'Tutorien in Grundlagen der Algorithmen, Programmiergrundlagen, Datenstrukturen, Analyse und Design von Algorithmen sowie Fortgeschrittener Programmierung.',
            'Erstellung von Lehrmaterialien, Bewertung von Arbeiten und Unterstützung von Studierenden bei Programmierproblemen.',
            'Leitung praktischer Sitzungen mit Gruppen von mehr als 20 Studierenden.',
          ],
        },
        'exp-security': {
          position: 'Sicherheitsdienst — Überwachungszentrum',
          description: [
            'Überwachung von Sicherheitskameras in einem Kontrollzentrum.',
            'Bearbeitung von Vorfällen und Koordination mit Außenteams.',
          ],
        },
      },
      skills: {
        categories: {
          Lenguajes: 'Sprachen',
          Frontend: 'Frontend',
          Backend: 'Backend',
          Datos: 'Daten',
          DevOps: 'DevOps',
          Otros: 'Sonstiges',
          'Habilidades Blandas': 'Soft Skills',
        },
        softSkillsTitle: 'Soft Skills',
        softSkillsItems: [
          'Technologische Anpassungsfähigkeit',
          'Eigenständiges Lernen',
          'Teamarbeit',
          'Problemlösung',
          'Analytisches Denken',
          'Effektive Kommunikation',
          'Projektmanagement und Planung',
          'Verantwortungsbewusstsein',
        ],
        chartLabel: 'Kompetenz',
      },
      projects: {
        simulapucv: {
          shortDescription: 'Analyse- und Simulationswerkzeug für universitäre Kohorten',
          description:
            'SimulaPUCV ist eine interaktive Simulationsplattform zur Analyse und Simulation kompletter universitärer Kohorten. Sie visualisiert das Verhalten von Studierendengruppen über die Zeit und modelliert Einschreibung, akademische Leistung und Abschlussraten. Entwickelt mit React und Go für maximale Performance, mit PostgreSQL als Datenbasis.',
        },
        omnidesk: {
          shortDescription: 'Plattformübergreifender persönlicher Organizer mit Cloud-Synchronisierung',
          description:
            'OmniDesk ist ein persönlicher Organizer als Webanwendung und mobile App. Er bietet Aufgaben-, Listen-, Notiz- und Kalenderverwaltung mit anpassbaren Benachrichtigungen und Echtzeit-Synchronisierung zwischen Geräten. Ein moderner Stack mit skalierbarer Architektur für echte Produktivität.',
        },
        jamspace: {
          shortDescription: 'Anwendung zur Verwaltung von Banddaten',
          description:
            'JamSpace ist eine Anwendung für Musikbands, die Audio, Ideen, Texte und kreative Materialien zentral verwaltet. Sie enthält Aufnahmefunktionen, Sitzungsorganisation und Zusammenarbeit zwischen Bandmitgliedern.',
        },
        interiortwin: {
          shortDescription: 'AR-App für Interior Design mit gescannten Objekten',
          description:
            'InteriorTwin ist eine in Unity entwickelte Anwendung, mit der Objekte in Innenräumen bewegt, skaliert und platziert werden können, inklusive realistischer Physiksimulation. Das besondere Merkmal sind gescannte reale Modelle, die ein authentisches Interior-Design-Erlebnis ermöglichen. Das Projekt wurde im Team während des Studiums entwickelt.',
        },
        loopmania: {
          shortDescription: 'Lernspiel, das Programmieren über Gameplay vermittelt',
          description:
            'LoopMania ist ein in Unity entwickeltes Lernspiel, in dem der Spieler voranschreitet, indem er Befehle ähnlich wie Code schreibt. Das Spiel vermittelt Schleifen, Sequenzen und Programmierlogik auf interaktive und unterhaltsame Weise. Entwickelt in Zusammenarbeit mit einem Kommilitonen.',
        },
      },
    },
  },
  ru: {
    ui: {
      languageLabel: 'Язык',
      loadingTitle: 'javier@portfolio:~',
      loadingText: '$ загружаю резюме...',
      heroTerminalTitle: 'javier@portfolio:~',
      heroPhotoTitle: 'photo.png',
      heroGreeting: (name?: string) => (name ? `Привет, я ${name}` : 'Привет, добро пожаловать'),
      heroCommand: 'cat profile.txt',
      heroGithub: '$ github',
      heroLinkedin: '$ linkedin',
      homeIntroEyebrow: 'Обо мне',
      homeIntroTitle: 'Полезный софт, исследования и творчество',
      homeIntroBody: 'Здесь собраны мой опыт, проекты и технические навыки.',
      projectsTitle: '$ projects --featured',
      projectsSubtitle: '// Проекты, над которыми я работал',
      experienceTitle: '$ experience --timeline',
      experienceSubtitle: '// Профессиональный и академический путь',
      skillsTitle: '$ skills --list',
      skillsSubtitle: '// Технологии и инструменты',
      skillsTechnologiesTitle: '// Технологии',
      contactEyebrow: 'Контакт',
      contactTitle: 'Хотите обсудить проект?',
      contactBody:
        'Если у вас есть идея, проект или предложение, напишите мне. Я открыт к сотрудничеству и новым возможностям.',
      contactEmailLabel: 'email',
      contactGithubLabel: 'github',
      contactLinkedinLabel: 'linkedin',
      contactButton: '$ контакт --новый',
      footer: (year: number) => `// ${year} — javier sepúlveda — сделано с nuxt 3 + fastapi`,
      dates: {
        present: 'Сейчас',
        inProgress: 'В разработке',
      },
      projectDetail: {
        backLink: '← $ cd ..',
        descriptionTitle: '$ cat description.txt',
        technologiesTitle: '// Технологии',
        linksTitle: '// Ссылки',
        dateTitle: '// Дата',
        galleryTitle: '$ ls ./gallery',
        collaborateTitle: 'Заинтересованы в сотрудничестве?',
        collaborateBody: 'Если вам понравились проекты, которые вы увидели, я буду рад поговорить с вами.',
        collaborateButton: '$ контакт --новый',
        openLink: '$ open',
      },
      contactPage: {
        title: '$ контакт --инфо',
        subtitle: '// Оставьте мне сообщение',
        nameLabel: 'имя',
        emailLabel: 'email',
        messageLabel: 'сообщение',
        namePlaceholder: 'ваше полное имя',
        emailPlaceholder: 'you@example.com',
        messagePlaceholder: 'расскажите мне вашу идею...',
        submit: '$ отправить сообщение',
        submitting: '$ отправляю...',
        success: '// ✓ Сообщение получено. Я скоро отвечу.',
        requiredError: 'Пожалуйста, заполните все поля',
        nameLengthError: 'Имя должно содержать от 2 до 100 символов.',
        messageLengthError: 'Сообщение должно содержать от 10 до 2000 символов.',
        sendError: 'Ошибка при отправке сообщения. Попробуйте еще раз.',
        charCounter: (current: number, max: number) => `${current} / ${max}`,
      },
    },
    content: {
      profile: {
        title: 'Студент 5-го курса компьютерной инженерии',
        summary:
          'Студент 5-го курса компьютерной инженерии, увлеченный созданием полезного программного обеспечения и инструментов, которые я сам использую в жизни и которые могут помочь другим. У меня есть опыт в исследованиях, и я являюсь соавтором публикации по оптимизации расписаний в больницах. Меня вдохновляют музыка и видеоигры.',
      },
      experiences: {
        'exp-programming': {
          position: 'Ассистент по программированию — SimulaPUCV',
          description: [
            'Разработка и программирование SimulaPUCV, инструмента для моделирования университетских потоков, под руководством преподавателя.',
            'Реализация модулей симуляции, анализа данных и визуализации результатов. Перенос кода с MatLab на Go.',
          ],
        },
        'exp-research': {
          position: 'Ассистент по исследованиям',
          description: [
            'Исследования метаэвристик, применяемых к NP-трудным задачам, таким как Set Covering Problem и Roman Domination Problem.',
            'Соавтор опубликованной статьи по оптимизации расписаний в больницах.',
            'Разработка алгоритмических решений и анализ производительности разных подходов к оптимизации.',
          ],
        },
        'exp-teaching': {
          position: 'Ассистент преподавателя',
          description: [
            'Ассистирование по курсам Основы алгоритмов, Основы программирования, Структуры данных, Анализ и проектирование алгоритмов и Продвинутое программирование.',
            'Подготовка учебных материалов, проверка работ и помощь студентам в решении задач программирования.',
            'Проведение практических занятий для групп из 20+ студентов.',
          ],
        },
        'exp-security': {
          position: 'Охранник — центр мониторинга',
          description: [
            'Мониторинг камер наблюдения в центре безопасности.',
            'Обработка инцидентов и координация с полевыми командами.',
          ],
        },
      },
      skills: {
        categories: {
          Lenguajes: 'Языки',
          Frontend: 'Frontend',
          Backend: 'Backend',
          Datos: 'Данные',
          DevOps: 'DevOps',
          Otros: 'Другое',
          'Habilidades Blandas': 'Мягкие навыки',
        },
        softSkillsTitle: 'Мягкие навыки',
        softSkillsItems: [
          'Технологическая адаптивность',
          'Самостоятельное обучение',
          'Работа в команде',
          'Решение проблем',
          'Аналитическое мышление',
          'Эффективная коммуникация',
          'Планирование и управление проектами',
          'Ответственность',
        ],
        chartLabel: 'Компетенция',
      },
      projects: {
        simulapucv: {
          shortDescription: 'Инструмент анализа и моделирования университетских потоков',
          description:
            'SimulaPUCV — это интерактивная платформа моделирования, созданная для анализа и симуляции полных университетских потоков. Она визуализирует поведение студенческих когорт во времени, моделируя зачисление, академическую успеваемость и показатели выпуска. Построена на React и Go для максимальной производительности, с PostgreSQL в качестве движка данных.',
        },
        omnidesk: {
          shortDescription: 'Кроссплатформенный персональный органайзер с облачной синхронизацией',
          description:
            'OmniDesk — персональный органайзер, доступный как веб-приложение и мобильное приложение. Он предлагает управление задачами, списками, заметками и календарем с настраиваемыми уведомлениями и синхронизацией между устройствами в реальном времени. Современный стек со масштабируемой архитектурой для реальной продуктивности.',
        },
        jamspace: {
          shortDescription: 'Приложение для управления данными музыкальной группы',
          description:
            'JamSpace — это приложение для музыкальных групп, которое централизует аудио, идеи, тексты и творческие материалы. Оно включает запись, организацию сессий и совместную работу между участниками группы.',
        },
        interiortwin: {
          shortDescription: 'AR-приложение для дизайна интерьеров со сканированными объектами',
          description:
            'InteriorTwin — это приложение, разработанное в Unity, которое позволяет перемещать, изменять размер и размещать объекты в интерьерах с реалистичной физической симуляцией. Его особенность в том, что объекты представляют собой отсканированные модели реального мира, что создает подлинный опыт проектирования интерьеров. Проект был создан командой во время учебы в университете.',
        },
        loopmania: {
          shortDescription: 'Образовательная игра, обучающая программированию через геймплей',
          description:
            'LoopMania — это образовательная игра, созданная в Unity, в которой игрок продвигается, размещая команды подобно написанию кода. Игра обучает циклам, последовательностям и логике программирования в интерактивной и увлекательной форме. Разработана совместно с университетским коллегой.',
        },
      },
    },
  },
}

export function usePortfolioCopy() {
  const locale = useCookie<Locale>('portfolio-locale', { default: () => 'es' })
  const copy = computed(() => localeCopies[locale.value] ?? localeCopies.es)

  const setLocale = (nextLocale: Locale) => {
    locale.value = nextLocale
  }

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return copy.value.ui.dates.inProgress

    const parsedDate = new Date(dateStr)
    if (Number.isNaN(parsedDate.getTime())) return copy.value.ui.dates.inProgress

    return parsedDate.toLocaleDateString(localeTags[locale.value] ?? localeTags.es, {
      year: 'numeric',
      month: 'long',
    })
  }

  const formatRange = (startDate: string, endDate: string): string => {
    const start = formatDate(startDate)
    const end = !endDate || endDate === 'Present'
      ? copy.value.ui.dates.present
      : formatDate(endDate)

    return `${start} → ${end}`
  }

  const translateProfile = (profile: PersonalInfo | null): PersonalInfo | null => {
    if (!profile) return null

    return {
      ...profile,
      title: copy.value.content.profile.title,
      summary: copy.value.content.profile.summary,
    }
  }

  const translateExperience = (experience: ExperienceItem): ExperienceItem => {
    const localized = copy.value.content.experiences[experience.id]
    if (!localized) return experience

    return {
      ...experience,
      position: localized.position,
      description: localized.description,
      technologies: experience.technologies ? experience.technologies.map((t: string) => translateTechnology(t)) : experience.technologies,
    }
  }

  const techTranslations: Record<Locale, Record<string, string>> = {
    es: {
      React: 'React',
      Go: 'Go',
      PostgreSQL: 'PostgreSQL',
      Docker: 'Docker',
      TypeScript: 'TypeScript',
      Python: 'Python',
      Matlab: 'Matlab',
      'Tailwind CSS': 'Tailwind CSS',
      Vue: 'Vue',
      'Nuxt 3': 'Nuxt 3',
      'Next.js': 'Next.js',
      Angular: 'Angular',
      NestJS: 'NestJS',
      'React Native': 'React Native',
      'Web Audio API': 'Web Audio API',
      'Metaheurísticas': 'Metaheurísticas',
      'Monitoreo CCTV': 'Monitoreo CCTV',
      'Gestión de incidencias': 'Gestión de incidencias',
      Algoritmos: 'Algoritmos',
    },
    en: {
      React: 'React',
      Go: 'Go',
      PostgreSQL: 'PostgreSQL',
      Docker: 'Docker',
      TypeScript: 'TypeScript',
      Python: 'Python',
      Matlab: 'Matlab',
      'Tailwind CSS': 'Tailwind CSS',
      Vue: 'Vue',
      'Nuxt 3': 'Nuxt 3',
      'Next.js': 'Next.js',
      Angular: 'Angular',
      NestJS: 'NestJS',
      'React Native': 'React Native',
      'Web Audio API': 'Web Audio API',
      'Metaheurísticas': 'Metaheuristics',
      'Monitoreo CCTV': 'CCTV monitoring',
      'Gestión de incidencias': 'Incident management',
      Algoritmos: 'Algorithms',
    },
    de: {
      React: 'React',
      Go: 'Go',
      PostgreSQL: 'PostgreSQL',
      Docker: 'Docker',
      TypeScript: 'TypeScript',
      Python: 'Python',
      Matlab: 'Matlab',
      'Tailwind CSS': 'Tailwind CSS',
      Vue: 'Vue',
      'Nuxt 3': 'Nuxt 3',
      'Next.js': 'Next.js',
      Angular: 'Angular',
      NestJS: 'NestJS',
      'React Native': 'React Native',
      'Web Audio API': 'Web Audio API',
      'Metaheurísticas': 'Metaheuristiken',
      'Monitoreo CCTV': 'CCTV-Überwachung',
      'Gestión de incidencias': 'Vorfallmanagement',
      Algoritmos: 'Algorithmen',
    },
    ru: {
      React: 'React',
      Go: 'Go',
      PostgreSQL: 'PostgreSQL',
      Docker: 'Docker',
      TypeScript: 'TypeScript',
      Python: 'Python',
      Matlab: 'Matlab',
      'Tailwind CSS': 'Tailwind CSS',
      Vue: 'Vue',
      'Nuxt 3': 'Nuxt 3',
      'Next.js': 'Next.js',
      Angular: 'Angular',
      NestJS: 'NestJS',
      'React Native': 'React Native',
      'Web Audio API': 'Web Audio API',
      'Metaheurísticas': 'Метаэвристики',
      'Monitoreo CCTV': 'Мониторинг CCTV',
      'Gestión de incidencias': 'Управление инцидентами',
      Algoritmos: 'Алгоритмы',
    },
  }

  const translateTechnology = (tech: string): string => {
    const loc = locale.value as Locale
    return techTranslations[loc]?.[tech] ?? tech
  }

  const translateProject = (project: ProjectItem): ProjectItem => {
    const localized = copy.value.content.projects[project.id]
    if (!localized) return project

    return {
      ...project,
      short_description: localized.shortDescription,
      description: localized.description,
      technologies: project.technologies ? project.technologies.map((t: string) => translateTechnology(t)) : project.technologies,
    }
  }

  const translateSkillCategory = (category: string): string => {
    return copy.value.content.skills.categories[category] ?? category
  }

  const translateSoftSkills = (items: string[]): string[] => {
    return copy.value.content.skills.softSkillsItems.length
      ? copy.value.content.skills.softSkillsItems
      : items
  }

  const isSoftSkillsCategory = (category: string): boolean => category === 'Habilidades Blandas'

  return {
    locale,
    copy,
    localeOptions,
    setLocale,
    formatDate,
    formatRange,
    translateProfile,
    translateExperience,
    translateProject,
    translateSkillCategory,
    translateSoftSkills,
    isSoftSkillsCategory,
  }
}
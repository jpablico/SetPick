import type { Player } from './types';

export const SAMPLE_PLAYERS: Player[] = [
  { id: 'p1', name: 'Lynnie Huynh', positions: { primary: 'OH',  secondary: 'L', tertiary: 'S' }, skill: 6, fit: 7 },
  { id: 'p2', name: 'Edward Hambleton', positions: { primary: 'MB', secondary: 'OH', tertiary: 'S' }, skill: 6, fit: 5 },
  { id: 'p3', name: 'Josh Pablico',  positions: { primary: 'S', secondary: 'OH', tertiary:  'L' }, skill: 9, fit: 9 },
  { id: 'p4', name: 'Olivia Cunningham',  positions: { primary: 'OH',secondary: 'OPP', tertiary: 'S' }, skill: 8, fit: 8 },
  { id: 'p5', name: 'Joel Luna',   positions: { primary: 'OH',  secondary: 'OPP', tertiary: 'S' }, skill: 7, fit: 8 },

  { id: 'p6', name: 'Phillip Hardaway',  positions: { primary: 'OH', secondary: 'MB'  }, skill: 7, fit: 5 },
  { id: 'p7', name: 'Sruthi Dubagunta',   positions: { primary: 'L',  secondary: 'OH', tertiary: 'S' }, skill: 6, fit: 5 },
  { id: 'p8', name: 'Mark Younker',  positions: { primary: 'MB', secondary: 'OH', tertiary: 'L' }, skill: 8, fit: 8 },
  { id: 'p9', name: 'Ivy Lin',   positions: { primary: 'OH',  secondary: 'S' }, skill: 8, fit: 7 },
  { id: 'p10',name: 'Nikaya Etienne',   positions: { primary: 'OH', secondary: 'OPP', tertiary:  'MB' }, skill: 7, fit: 6 },

  { id: 'p11',name: 'Ileana Benavides',   positions: { primary: 'OH',secondary: 'L', tertiary: 'S' }, skill: 8, fit: 9 },
  { id: 'p12',name: 'Katie Borg',   positions: { primary: 'U'  }, skill: 4, fit: 4 },
  { id: 'p13',name: 'Ravi Atla',   positions: { primary: 'OH', tertiary: 'S' }, skill: 6, fit: 5 },
  { id: 'p14',name: 'Jerry Carrillo',  positions: { primary: 'MB', secondary: 'OH', tertiary: 'S' }, skill: 5, fit: 5 },
  { id: 'p15',name: 'Jessica Carrillo',   positions: { primary: 'U',  tertiary: 'S' }, skill: 4,fit: 4 },

  { id: 'p16',name: 'Sar Goswami',positions: { primary: 'U' }, skill: 5, fit: 5 },
  { id: 'p17',name: 'Grant Gilbreath', positions: { primary: 'MB', secondary: 'OH', tertiary: 'OPP' }, skill: 5, fit: 5 },
  { id: 'p18',name: 'Adrew Boland', positions: { primary: 'U' }, skill: 5, fit: 4 },
  { id: 'p19',name: 'David Busby',   positions: { primary: 'MB',secondary: 'OH', tertiary: 'L' }, skill: 8, fit: 9 },
  { id: 'p20',name: 'Anh Trinh',   positions: { primary: 'U',  tertiary: 'L' }, skill: 6, fit: 7 },

  { id: 'p21',name: 'Ailynn-Grace Betguen',   positions: { primary: 'L', secondary: 'S'  }, skill: 5, fit: 7 },
  { id: 'p22',name: 'Kimberly Dugenio',   positions: { primary: 'U' }, skill: 5, fit: 9 },
  { id: 'p23',name: 'Michael Alfaro',   positions: { primary: 'OH', secondary: 'OPP', tertiary: 'L' }, skill: 8, fit: 8 },
  { id: 'p24',name: 'Raquel Nottingham',   positions: { primary: 'OH',  secondary: 'S'  }, skill: 6, fit: 5 },
  { id: 'p25',name: 'Evan Lieu',  positions: { primary: 'OPP', secondary: 'OH' }, skill: 6, fit: 6 },

  { id: 'p26',name: 'Eric. Epperson',   positions: { primary: 'OH',secondary: 'L', tertiary: 'MB' }, skill: 5, fit: 4 },
  { id: 'p27',name: 'Huy Phan',   positions: { primary: 'OH',  secondary: 'L', tertiary: 'OPP' }, skill: 8, fit: 8 },
  { id: 'p28',name: 'Gray Parker',   positions: { primary: 'OH', tertiary: 'S' }, skill: 5, fit: 5 },
  { id: 'p29',name: 'Tyler Pierce',   positions: { primary: 'U' }, skill: 8, fit: 8 },
  { id: 'p30',name: 'Tareto Nasari',   positions: { primary: 'U' }, skill: 5, fit: 5 },

  { id: 'p31',name: 'Reyna Santana',   positions: { primary: 'OH',  secondary: 'L', tertiary: 'MB' }, skill: 6, fit: 6 },
  { id: 'p32',name: 'Renzo Aquino',   positions: { primary: 'U', tertiary: 'S' }, skill: 9, fit: 7 },
  { id: 'p33',name: 'Karina Robles',   positions: { primary: 'U' }, skill: 7, fit: 7 },
  { id: 'p34',name: 'Steve John',   positions: { primary: 'U' }, skill: 5, fit: 5 },
  { id: 'p35',name: 'Austin Lee',   positions: { primary: 'MB',  tertiary: 'S' }, skill: 6, fit: 6 },

  { id: 'p36',name: 'Ray Rivera',   positions: { primary: 'MB', secondary: 'L'  }, skill: 4, fit: 5 },
  { id: 'p37',name: 'Haley Fruth',   positions: { primary: 'S'}, skill: 7, fit: 7 },
  { id: 'p38',name: 'Tien Nguyen',   positions: { primary: 'OH', secondary: 'MB', tertiary: 'L' }, skill: 6, fit: 5 },
  { id: 'p39',name: 'Michael Xu',   positions: { primary: 'L',  secondary: 'S'  }, skill: 7, fit: 6 },
  { id: 'p40',name: 'Het Baboo',   positions: { primary: 'MB', secondary: 'S', tertiary: 'OH' }, skill: 6, fit: 6 },

  { id: 'p41',name: 'Lucky Pillai',  positions: { primary: 'OH',secondary: 'MB' }, skill: 5, fit: 5 },
  { id: 'p42',name: 'Mason Webb',   positions: { primary: 'U' }, skill: 5, fit: 5 },

];
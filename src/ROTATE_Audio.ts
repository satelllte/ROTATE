import {Howl} from 'howler';

const resolveSrc = (type: 'music' | 'sfx', name: string): string[] => [
  `${type}/${name}.ogg`,
  `${type}/${name}.mp3`,
];

export class ROTATE_Audio {
  public static readonly themeMenu = new Howl({
    src: resolveSrc('music', 'menu'),
    loop: true,
  });

  public static readonly themeGame1 = new Howl({
    src: resolveSrc('music', 'game-1'),
    loop: true,
    volume: 0.8,
  });

  public static readonly themeGame2 = new Howl({
    src: resolveSrc('music', 'game-2'),
    loop: true,
    volume: 0.75,
  });

  public static readonly surface = new Howl({
    src: resolveSrc('sfx', 'surface'),
    loop: true,
  });

  public static readonly steps = new Howl({
    src: resolveSrc('sfx', 'steps'),
    sprite: {
      a: [0, 400],
      b: [475, 400],
    },
  });

  public static readonly death = new Howl({
    src: resolveSrc('sfx', 'death'),
  });

  public static readonly rotate = new Howl({
    src: resolveSrc('sfx', 'rotate'),
  });

  public static readonly exit = new Howl({
    src: resolveSrc('sfx', 'exit'),
  });

  public static readonly door = new Howl({
    src: resolveSrc('sfx', 'door'),
  });

  public static readonly cat = new Howl({
    src: resolveSrc('sfx', 'cat'),
  });

  public static readonly leverOn = new Howl({
    src: resolveSrc('sfx', 'lever-on'),
  });

  public static readonly leverOff = new Howl({
    src: resolveSrc('sfx', 'lever-off'),
  });

  public static readonly voice = new Howl({
    src: resolveSrc('sfx', 'voice'),
    sprite: {
      a: [0, 1e3],
      b: [1111, 1e3],
      c: [2222, 1e3],
      d: [3333, 1e3],
      e: [4444, 1e3],
      f: [5555, 1e3],
      g: [6666, 1e3],
      h: [7777, 1e3],
    },
    volume: 0.9,
  });

  public static readonly SFX = [
    ROTATE_Audio.steps,
    ROTATE_Audio.death,
    ROTATE_Audio.rotate,
    ROTATE_Audio.exit,
    ROTATE_Audio.door,
    ROTATE_Audio.cat,
    ROTATE_Audio.leverOn,
    ROTATE_Audio.leverOff,
    ROTATE_Audio.voice,
  ] as const;
}

"use strict";

class WarhammerEntity {
  #isAlive;
  constructor(name, faction, rank) {
    this.name = name;
    this.faction = faction;
    this.rank = rank;
    this.#isAlive = true;
  }
  attack = () => {
    console.log(`${this.name} атакує!`);
  };
  defend = () => {
    console.log(`${this.name} захищає!`);
  };
  retreat = () => {
    console.log(`${this.name} відступає!`);
  };
  isAlive = () => {
    return this.#isAlive;
  };
  setAlive = (status) => {
    this.#isAlive = status;
  };
}

class Imperial extends WarhammerEntity {
  constructor(name, rank, regiment) {
    super(name, "Imperium", rank);
    this.regiment = regiment;
  }
  followOrders = () => {
    console.log(`${this.name} виконує накази командира.`);
  };
}

class ImperialGuard extends Imperial {
  constructor(name, rank, regiment, weapon) {
    super(name, rank, regiment);
    this.weapon = weapon;
  }
  fireWeapon = () => {
    console.log(`${this.name} звільняє їх ${this.weapon}.`);
  };
  callReinforcements = () => {
    console.log(`${this.name} викликає підкріплення.`);
  };
  digIn = () => {
    console.log(`${this.name} окопається для захисту.`);
  };
}

class SpaceMarine extends Imperial {
  constructor(name, rank, chapter, powerArmor) {
    super(name, rank, "Space Marine");
    this.chapter = chapter;
    this.powerArmor = powerArmor;
  }
  useChainsword = () => {
    console.log(`${this.name} використовує свій ланцюговий меч.`);
  };
  activatePowerArmor = () => {
    console.log(`${this.name} активує свою силову броню.`);
  };
  performTacticalManeuver = () => {
    console.log(`${this.name} виконує тактичний маневр.`);
  };
}

class ChaosMarine extends WarhammerEntity {
  constructor(name, rank, legion, markOfChaos) {
    super(name, "Chaos", rank);
    this.legion = legion;
    this.markOfChaos = markOfChaos;
  }
  invokeChaos = () => {
    console.log(`${this.name} викликає силу Хаосу.`);
  };
  corrupt = () => {
    console.log(`${this.name} псує все навколо.`);
  };
  sacrifice = () => {
    console.log(`${this.name} приносить жертву темним богам.`);
  };
}

class Ork extends WarhammerEntity {
  constructor(name, rank, klan, choppa) {
    super(name, "Ork", rank);
    this.klan = klan;
    this.choppa = choppa;
  }
  waaagh = () => {
    console.log(`${this.name} кричить WAAAGH!`);
  };
  fight = () => {
    console.log(`${this.name} бореться зі своїми ${this.choppa}.`);
  };
  loot = () => {
    console.log(`${this.name} грабує поле бою.`);
  };
}

const guardsman = new ImperialGuard("Jenkins", "Sergeant", "Cadian", "Lasgun");
guardsman.attack();
guardsman.fireWeapon();
guardsman.followOrders();
console.log(guardsman.isAlive());

const marine = new SpaceMarine("Gabriel", "Captain", "Blood Ravens", "Mk VII");
marine.defend();
marine.useChainsword();
marine.activatePowerArmor();
console.log(marine.isAlive());

const chaosMarine = new ChaosMarine("Azazel", "Champion", "Word Bearers", "Mark of Khorne");
chaosMarine.attack();
chaosMarine.invokeChaos();
chaosMarine.corrupt();
console.log(chaosMarine.isAlive());

const ork = new Ork("Ghazghkull", "Warboss", "Goff", "Big Choppa");
ork.waaagh();
ork.fight();
ork.loot();
console.log(ork.isAlive());

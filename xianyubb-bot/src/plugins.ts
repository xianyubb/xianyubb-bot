
export class Plugins{
    name: string;
    description: string;
    version: number[];
    otherinformation: object;
  constructor(name: string, description: string, version: number[], otherinformation: object) {
    this.name= name;
    this.description = description;
    this.version = version;
    this.otherinformation = otherinformation;
    console.log("加载插件: "+this.name+"\n版本: "+this.version+"\n描述: "+this.description+"\n其他信息: "+JSON.stringify(this.otherinformation))
  }
}

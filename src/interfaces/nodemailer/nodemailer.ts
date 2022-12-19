export interface INodemailer{
  host: String,
  port:number,
  secure:boolean,
  body:{
    from:string,
    to:string,
    subject:string,
    text:string
    }
}
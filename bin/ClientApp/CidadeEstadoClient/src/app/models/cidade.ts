export class CidadeModel
{
	id: string;
	nome: string;	
	idEstado: string;

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}
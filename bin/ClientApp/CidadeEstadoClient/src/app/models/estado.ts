import { CidadeModel } from './cidade';

export class EstadoModel
{
	id: string;
	nome: string;	
	abreviacao: string;
	cidades: CidadeModel[];

	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}
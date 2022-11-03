class ApiRespnse {
    status: number | undefined;
    data: any;
    constructor(status: number, data: any){
        this.status = status;
        this.data = data;
    }
}
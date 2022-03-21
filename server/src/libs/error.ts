export default class Error{

    public static db(): string{
        return 'Ошибка базы данных';
    }

    public static notFound(obj: string): string{
        return `Данные об объекте: ${obj} - не были найдены`;
    }

    public static dataNotSended(obj: string): string{
        return `Данные про объект '${obj}' не были отправлены`;
    }

    public static file(): string{
        return 'Ошибка с сохранением файла';
    }

    public static notValidJWT(): string {
        return 'Защитный токен не корректен';
    }
}
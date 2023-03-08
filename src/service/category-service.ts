import { Category } from 'src/model/Category';
import { AppDataSource } from '../data-source';
class CategoryService {
    categoryRepository: any;
    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }
    getAllCategory = async () => {
        return await this.categoryRepository.find()
    }
}
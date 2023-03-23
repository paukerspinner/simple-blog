import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update({id}, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete({id});
  }

  async search(searchPostDto: SearchPostDto) {
    const { keyword } = searchPostDto;
    const matchedPosts = await this.postRepository.createQueryBuilder()
      .where('to_tsvector(concat(title, content)) @@ phraseto_tsquery(:keyword)', { keyword })
      .getMany();
    return matchedPosts;
  }
}

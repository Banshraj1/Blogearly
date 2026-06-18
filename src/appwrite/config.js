import { data } from "react-router-dom";
import conf, { sampleData } from "./conf.js";

import {
  Client,
  Storage,
  Query,
  ID,
  Databases,
  Role,
  Permission,
} from "appwrite";

export class Service {
  client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    authorName,
  }) {
    {
      try {
        const response = await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug + Date.now(),
          {
            title,
            content,
            featuredImage,
            status: status === "public" ? true : false,
            userId,
            authorName,
          },
          [Permission.read(Role.any())],
        );
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  async updatePost(
    slug,
    { title, content, featuredImage, status, authorName },
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status: status === "public" || status === true ? true : false,
          authorName,
        },
        [Permission.read(Role.any())],
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(slug, fileId) {
    try {
      await this.deleteFile(fileId);
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });

      return true;
    } catch (error) {
      // console.log(slug);
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      
      const response= await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
      // console.log("response of get post",response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  // https://cdn.tiny.cloud/1/no-api-key/tinymce/8/tinymce.min.js
  // https://www.tiny.cloud/docs/tinymce/latest/invalid-api-key/?utm_campaign=no_api_key_learn_more&utm_source=tiny&utm_medium=referral
  async getPosts(queries = [Query.equal("status", true)]) {
    console.log(queries);

    try {
      console.log("getpost tried");

      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("error :: getposts :: ", error);
    }
  }

  //file upload method or services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      if (fileId == sampleData.$id) return "";
      console.log("file deleted");

      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite service :: error :: deleteFile :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log(error);
    }
  }

  getFileUrl(fileId) {
    try {
      const url = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteId}`;
      // console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  }
}

const service = new Service();

export default service;

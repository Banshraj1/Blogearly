import { data } from "react-router-dom";
import conf from "./conf.js";

import { Client, Storage, Query, ID, Databases } from "appwrite";

export class Service {
  client = new Client();
  Databases;
  bucket;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    {
      try {
        return await this.databases.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug,
          {
            title,
            content,
            featuredImage,
            status: Boolean(status),
            userId,
          },
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        slug,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
    } catch (error) {
      console.log(error);
    }
  }
// https://cdn.tiny.cloud/1/no-api-key/tinymce/8/tinymce.min.js
// https://www.tiny.cloud/docs/tinymce/latest/invalid-api-key/?utm_campaign=no_api_key_learn_more&utm_source=tiny&utm_medium=referral
  async getPosts(queries = [Query.equal("status", true)]) {
    try {
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
}

const service = new Service();

export default service;

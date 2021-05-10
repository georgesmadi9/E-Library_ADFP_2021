package com.example.demo;

import javax.persistence.*;

// Book Entity for the database
// If no database was created with the name
// in application.properties it will be generate automatically
// with the parameters given in the attributes of the class
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "description", length = 5000)
    private String description;

    @Column(name = "author", length = 25)
    private String author;

    @Column(name="rating")
    private float rating;

    public Book() {

    }

    public Book(String title, String description, String author, float rating) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.rating = rating;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public float getRating() {
        return rating;
    }

    @Override
    public String toString() {
        return "Book [id=" + id + ", title=" + title + ", desc=" + description + ", author=" + author + ", rating=" + rating + "]";
    }
}

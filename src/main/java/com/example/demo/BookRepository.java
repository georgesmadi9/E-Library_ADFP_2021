package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

// Methods to call the API Requests
public interface BookRepository extends JpaRepository<Book, Long> {

    // GET Request to get books by title /api/Books?title={:title}
    @Query(value = "SELECT * FROM books WHERE title LIKE :pattern", nativeQuery = true)
    List<Book> findByTitle(@Param("pattern") String pattern);

    // GET Request to get books by author /api/Books?author={:author}
    @Query(value = "SELECT * FROM books WHERE author = :author", nativeQuery = true)
    List<Book> findByAuthor(@Param("author") String author);

    // GET Request to get books by rating /api/Books?rating={:number}
    @Query(value = "SELECT * FROM books WHERE rating >= :number", nativeQuery = true)
    List<Book> findByRating(@Param("number") float rating);

    // GET Request to get books by author & rating /api/Books?author={:author}&rating={:number}
    @Query(value = "SELECT * FROM books WHERE author = :author AND rating >= :number", nativeQuery = true)
    List<Book> findByAuthorAndRating(@Param("author") String author, @Param("number") float rating);

}

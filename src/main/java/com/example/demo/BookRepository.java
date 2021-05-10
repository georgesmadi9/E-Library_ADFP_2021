package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "SELECT * FROM books WHERE author = :author", nativeQuery = true)
    List<Book> findByAuthor(@Param("author") String author);

    @Query(value ="SELECT * FROM books WHERE title LIKE :pattern", nativeQuery = true)
    List<Book> findByTitle(@Param("pattern") String pattern);

    @Query(value ="SELECT * FROM books WHERE rating >= :number", nativeQuery = true)
    List<Book> findByRating(@Param("number") float rating);

    @Query(value = "SELECT * FROM books WHERE author = :author AND rating >= :number",nativeQuery = true)
    List<Book> findByAuthorAndRating(@Param("author") String author, @Param("number") float rating);

}

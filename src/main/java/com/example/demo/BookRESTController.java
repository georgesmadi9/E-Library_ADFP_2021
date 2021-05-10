package com.example.demo;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
@SpringBootApplication
@OpenAPIDefinition
public class BookRESTController {

    @Autowired
    BookRepository bookRepository;

    @GetMapping("/Books")
    public ResponseEntity<List<Book>> getAllBooks(@RequestParam(required = false) String title) {
        try {
            List<Book> books = new ArrayList<Book>();

            if (title == null)
                bookRepository.findAll().forEach(books::add);
            else
                bookRepository.findByTitle(title).forEach(books::add);

            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/Books/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") long id) {
        Optional<Book> bookData = bookRepository.findById(id);

        if (bookData.isPresent()) {
            return new ResponseEntity<>(bookData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/Books")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        try {
            Book _book = bookRepository.save(new Book(book.getTitle(), book.getDescription(), book.getAuthor(), book.getRating()));
            return new ResponseEntity<>(_book, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/Books/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
        Optional<Book> bookData = bookRepository.findById(id);

        if (bookData.isPresent()) {
            Book _book = bookData.get();
            _book.setTitle(book.getTitle());
            _book.setDescription(book.getDescription());
            _book.setAuthor(book.getAuthor());
            _book.setRating(book.getRating());
            return new ResponseEntity<>(bookRepository.save(_book), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/Books/{id}")
    public ResponseEntity<HttpStatus> deleteBook(@PathVariable("id") long id) {
        try {
            bookRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/Books")
    public ResponseEntity<HttpStatus> deleteAllBooks() {
        try {
            bookRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/Books/author/{author}")
    public ResponseEntity<List<Book>> findByAuthor(@PathVariable("author") String author) {
        try {
            List<Book> books = bookRepository.findByAuthor(author);
            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/Books", params = "title", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Book>> findByTitle(@RequestParam("title") String title) {
        try {
            List<Book> books = bookRepository.findByTitle("%" + title + "%");
            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/Books", params = "author", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Book>> findByAuthor2(@RequestParam("author") String author) {
        try {
            List<Book> books = bookRepository.findByAuthor(author);
            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/Books", params = "rating", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Book>> findByRating(@RequestParam("rating") float rating) {
        try {
            List<Book> books = bookRepository.findByRating(rating);
            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/Books", params = {"author","rating"}, method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<Book>> findByAuthorAndRating(@RequestParam("author") String author, @RequestParam("rating") float rating) {
        try {
            List<Book> books = bookRepository.findByAuthorAndRating(author, rating);
            if (books.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
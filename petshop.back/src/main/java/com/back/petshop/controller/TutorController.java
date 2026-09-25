package com.back.petshop.controller;

import com.back.petshop.model.Tutor;
import com.back.petshop.service.TutorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/tutores")
@CrossOrigin(origins = "*")
public class TutorController {
    private final TutorService tutorService;

    public TutorController(TutorService tutorService){
        this.tutorService = tutorService;
    }

    @PostMapping
    public ResponseEntity<Tutor> criar(@RequestBody Tutor tutor){
        Tutor novoTutor = tutorService.salvar(tutor);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoTutor);
    }

    @GetMapping
    public ResponseEntity<List<Tutor>> listarTodos(){
        return ResponseEntity.ok(tutorService.listarTodos());
    }

    @GetMapping("/clinica/{clinicaId}")
    public ResponseEntity<List<Tutor>> listarPorClinica(@PathVariable Long clinicaId) {
        return ResponseEntity.ok(tutorService.buscarPorClinica(clinicaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> buscarPorId(@PathVariable Long id) {
        Optional<Tutor> tutor = tutorService.buscarPorId(id);

        if (tutor.isPresent()) {
            return ResponseEntity.ok(tutor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> atualizar(@PathVariable Long id, @RequestBody Tutor tutor) {
        try {
            Tutor tutorAtualizado = tutorService.atualizar(id, tutor);
            return ResponseEntity.ok(tutorAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            tutorService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

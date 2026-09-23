package com.back.petshop.controller;

import com.back.petshop.model.Clinica;
import com.back.petshop.service.ClinicaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/clinicas")
public class ClinicaController {

    private final ClinicaService clinicaService;

    public ClinicaController(ClinicaService clinicaService){
        this.clinicaService = clinicaService;
    }

    @PostMapping
    public ResponseEntity<Clinica> criar(@RequestBody Clinica clinica){
        Clinica novaClinica = clinicaService.salvar(clinica);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaClinica);
    }

    @GetMapping
    public ResponseEntity<List<Clinica>> listarTodas(){
        List<Clinica> clinicas = clinicaService.listarTodas();
        return ResponseEntity.ok(clinicas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Clinica> buscarPorId(@PathVariable Long id) {
        Optional<Clinica> clinica = clinicaService.buscarPorId(id);

        if(clinica.isPresent()) {
            return ResponseEntity.ok(clinica.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clinica> atualizar(@PathVariable Long id, @RequestBody Clinica clinica) {
        try {
            Clinica clinicaAtualizada = clinicaService.atualizar(id, clinica);
            return ResponseEntity.ok(clinicaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            clinicaService.deletar(id);
            return ResponseEntity.noContent().build(); // Retorna 204 No Content (Sucesso, sem corpo)
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

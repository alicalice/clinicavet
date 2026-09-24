package com.back.petshop.service;

import com.back.petshop.model.Clinica;
import com.back.petshop.repository.ClinicaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClinicaService {
    private final ClinicaRepository clinicaRepository;

    public ClinicaService(ClinicaRepository clinicaRepository){
        this.clinicaRepository = clinicaRepository;
    }

    public Clinica salvar(Clinica clinica){
        return clinicaRepository.save(clinica);
    }

    public List<Clinica> listarTodas(){
        return clinicaRepository.findAll();
    }

    public Optional<Clinica> buscarPorId(Long id){
        return clinicaRepository.findById(id);
    }

    public Clinica atualizar(Long id, Clinica clinicaAtualizada){
        Clinica clinicaExistente = clinicaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Clinica com o id "+ id + " não encontrada!"));

        clinicaExistente.setNome(clinicaAtualizada.getNome());
        clinicaExistente.setTelefone(clinicaAtualizada.getTelefone());
        clinicaExistente.setEndereco(clinicaAtualizada.getEndereco());

        return clinicaRepository.save(clinicaExistente);
    }

    public void deletar(Long id){
        if(clinicaRepository.existsById(id)){
            clinicaRepository.deleteById(id);
        }
        else {
            throw new RuntimeException("Clinica com o id "+ id + " não encontrada!");
        }
    }
}

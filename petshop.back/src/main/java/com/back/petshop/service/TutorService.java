package com.back.petshop.service;

import com.back.petshop.model.Tutor;
import com.back.petshop.repository.TutorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorService {

    private final TutorRepository tutorRepository;

    public TutorService(TutorRepository tutorRepository){
        this.tutorRepository = tutorRepository;
    };
    public Tutor salvar(Tutor tutor){
        return tutorRepository.save(tutor);
    }
    public List<Tutor> listarTodos(){
        return tutorRepository.findAll();
    }

    public Optional<Tutor> buscarPorId(Long id){
        return tutorRepository.findById(id);
    }
    public List<Tutor> buscarPorClinica(Long clinicaId) {
        return tutorRepository.findByClinicaId(clinicaId);
    }

    public Tutor atualizar(Long id, Tutor tutorAtualizado){
        Tutor tutorExistente = tutorRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Tutor com o id '"+ id + "' não encontrado"));

        tutorExistente.setNome(tutorAtualizado.getNome());
        tutorExistente.setCpf(tutorAtualizado.getCpf());
        tutorExistente.setTelefone(tutorAtualizado.getTelefone());
        tutorExistente.setClinica(tutorAtualizado.getClinica());

        return tutorRepository.save(tutorExistente);
    }

    public void deletar(Long id){
        if(tutorRepository.existsById(id)){
            tutorRepository.deleteById(id);
        }else{
            throw new RuntimeException("Tutor com o id '"+ id + "' não encontrado");
        }
    }

}

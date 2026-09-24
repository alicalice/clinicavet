package com.back.petshop.service;

import com.back.petshop.model.Paciente;
import com.back.petshop.repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {
    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    public Paciente salvar(Paciente paciente) {
        return pacienteRepository.save(paciente);
    }

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public Optional<Paciente> buscarPorId(Long id) {
        return pacienteRepository.findById(id);
    }

    public Paciente atualizar(Long id, Paciente pacienteAtualizado) {
        Paciente pacienteExistente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado com o id: " + id));

        pacienteExistente.setNome(pacienteAtualizado.getNome());
        pacienteExistente.setEspecie(pacienteAtualizado.getEspecie());
        pacienteExistente.setRaca(pacienteAtualizado.getRaca());
        pacienteExistente.setIdade(pacienteAtualizado.getIdade());

        if (pacienteAtualizado.getTutor() != null) {
            pacienteExistente.setTutor(pacienteAtualizado.getTutor());
        }

        return pacienteRepository.save(pacienteExistente);
    }

    public void deletar(Long id) {
        if (pacienteRepository.existsById(id)) {
            pacienteRepository.deleteById(id);
        } else {
            throw new RuntimeException("Paciente não encontrado com o id: " + id);
        }
    }
}

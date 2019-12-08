package congvanservice.services;

import congvanservice.models.TaiKhoan;
import congvanservice.repositories.TaiKhoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanProcessor implements TaiKhoanService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;
    @Override
    public Optional<TaiKhoan> findTaiKhoanById(Integer maTaiKhoan) {
        return taiKhoanRepository.findById(maTaiKhoan);
    }

    @Override
    public TaiKhoan saveTaiKhoan(TaiKhoan taiKhoan) {
        System.out.println("Save successfully");
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public TaiKhoan updateTaiKhoan(TaiKhoan taiKhoan) {
        System.out.println("Update successfully");
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public void deleteTaiKhoan(Integer maTaiKhoan) {
        System.out.println("Delete successfully");
        taiKhoanRepository.deleteById(maTaiKhoan);
    }

    @Override
    public List<TaiKhoan> findAll() {
        return taiKhoanRepository.findAll();
    }
}

package kr.ajousw.myspringweb.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;
import kr.ajousw.myspringweb.dto.FavoriteMusicRequestDto;
import kr.ajousw.myspringweb.dto.MusicList;
import kr.ajousw.myspringweb.entity.FavoriteMusic;
import kr.ajousw.myspringweb.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MusicService {
    private final FavoriteRepository albumsRepo;
    private RestTemplate restTemplate = new RestTemplate();
    public static String itunes_URL = "https://itunes.apple.com/search?entity=album&";

    public MusicList searchMusic(String term){        
        // 아래 코드는 클래스 메쏘드에 작성 – GetMapping 부분에 구현
        // 아래 코드에서 url은 “itunes url”
        try {
            String response = restTemplate.getForObject(
                String.format("%sterm=%s", itunes_URL, term), 
                String.class
            );
            ObjectMapper mapper = new ObjectMapper();
            MusicList list = mapper.readValue(response, MusicList.class);
            System.out.println("success> "+list.getResultCount());
            return list;
        } catch(Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public List<FavoriteMusic> getLikes(){
        try{
            return albumsRepo.findAll();
        }catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
    
    /**
     * Return true if the id is already exist
     * @param id
     * @return
     */
    private boolean checkAlreadyExist(String id){
        Optional<FavoriteMusic> music = albumsRepo.findById(id);
        return music.isPresent();
    }

    public int saveFavorite(FavoriteMusicRequestDto favorite){
        if(true == checkAlreadyExist(favorite.getCollectionId())){
            return 0;
        }
        FavoriteMusic music = albumsRepo.save(favorite.toEntity());
        if(music != null){
            return 1;
        }
        else{
            return 0;
        }
    }

    public int deleteFavorite(String id){
        if(false == checkAlreadyExist(id)){
            System.out.println("not exist!!");
            return 0;
        }
        albumsRepo.deleteById(id);
        return 1;
    }
}
